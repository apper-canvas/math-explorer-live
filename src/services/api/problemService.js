const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProblemService {
  constructor() {
    this.problems = [];
    this.currentId = 1;
    this.questionBanks = this.initializeQuestionBanks();
    this.sessionTracking = new Map(); // Track used questions per difficulty/operation
  }

  initializeQuestionBanks() {
    return {
      multiplication: {
        easy: this.generateMultiplicationQuestions('easy', 1, 5, 10),
        medium: this.generateMultiplicationQuestions('medium', 1, 10, 10),
        hard: this.generateMultiplicationQuestions('hard', 1, 12, 10)
      },
      division: {
        easy: this.generateDivisionQuestions('easy', 1, 5, 10),
        medium: this.generateDivisionQuestions('medium', 1, 10, 10),
        hard: this.generateDivisionQuestions('hard', 1, 12, 10)
      }
    };
  }

  generateMultiplicationQuestions(difficulty, minFactor, maxFactor, count) {
    const questions = [];
    const usedCombinations = new Set();
    
    // Predefined unique combinations for each difficulty
    let combinations = [];
    
    if (difficulty === 'easy') {
      combinations = [
        [2, 3], [1, 4], [2, 5], [3, 4], [1, 5],
        [2, 2], [3, 3], [4, 4], [1, 3], [2, 4]
      ];
    } else if (difficulty === 'medium') {
      combinations = [
        [3, 6], [4, 7], [5, 8], [2, 9], [6, 7],
        [3, 8], [4, 9], [5, 6], [7, 8], [2, 10]
      ];
    } else { // hard
      combinations = [
        [6, 8], [7, 9], [8, 10], [5, 12], [9, 11],
        [6, 11], [7, 12], [8, 9], [10, 11], [5, 11]
      ];
    }
    
    for (let i = 0; i < count && i < combinations.length; i++) {
      const [factor1, factor2] = combinations[i];
      
      questions.push({
        questionId: `mult_${difficulty}_${i + 1}`,
        operand1: factor1,
        operand2: factor2,
        answer: factor1 * factor2,
        difficulty,
        index: i
      });
    }
    
    return questions;
  }

  generateDivisionQuestions(difficulty, minDivisor, maxDivisor, count) {
    const questions = [];
    
    // Predefined unique combinations that result in whole numbers
    let combinations = [];
    
    if (difficulty === 'easy') {
      combinations = [
        [6, 2], [8, 4], [10, 5], [9, 3], [12, 4],
        [15, 3], [16, 4], [20, 5], [14, 2], [18, 3]
      ];
    } else if (difficulty === 'medium') {
      combinations = [
        [24, 6], [35, 7], [48, 8], [27, 9], [60, 10],
        [44, 4], [36, 9], [32, 8], [42, 7], [54, 6]
      ];
    } else { // hard
      combinations = [
        [84, 12], [77, 11], [90, 10], [99, 9], [96, 8],
        [91, 7], [72, 6], [85, 5], [88, 8], [132, 12]
      ];
    }
    
    for (let i = 0; i < count && i < combinations.length; i++) {
      const [dividend, divisor] = combinations[i];
      
      questions.push({
        questionId: `div_${difficulty}_${i + 1}`,
        operand1: dividend,
        operand2: divisor,
        answer: dividend / divisor,
        difficulty,
        index: i
      });
    }
    
    return questions;
  }

  getDifficultyFromRange(minFactor, maxFactor, operation) {
    if (operation === 'multiplication') {
      if (maxFactor <= 5) return 'easy';
      if (maxFactor <= 10) return 'medium';
      return 'hard';
    } else if (operation === 'division') {
      if (maxFactor <= 5) return 'easy';
      if (maxFactor <= 10) return 'medium';
      return 'hard';
    }
    return 'medium';
  }

  getSessionKey(difficulty, operation) {
    return `${difficulty}_${operation}`;
  }

  getUsedQuestions(difficulty, operation) {
    const key = this.getSessionKey(difficulty, operation);
    return this.sessionTracking.get(key) || new Set();
  }

  markQuestionUsed(difficulty, operation, questionId) {
    const key = this.getSessionKey(difficulty, operation);
    const usedQuestions = this.sessionTracking.get(key) || new Set();
    usedQuestions.add(questionId);
    this.sessionTracking.set(key, usedQuestions);
  }

  resetSession(difficulty, operation) {
    const key = this.getSessionKey(difficulty, operation);
    this.sessionTracking.delete(key);
  }
async generateMultiplication(minFactor, maxFactor) {
    await delay(200);
    
    try {
      console.log('ProblemService: Generating multiplication with range:', minFactor, 'to', maxFactor);
      
      const difficulty = this.getDifficultyFromRange(minFactor, maxFactor, 'multiplication');
      console.log('ProblemService: Determined difficulty:', difficulty);
      
      const questionBank = this.questionBanks.multiplication[difficulty];
      if (!questionBank || questionBank.length === 0) {
        throw new Error(`No question bank found for multiplication difficulty: ${difficulty}`);
      }
      
      console.log('ProblemService: Question bank size:', questionBank.length);
      
      const usedQuestions = this.getUsedQuestions(difficulty, 'multiplication');
      console.log('ProblemService: Used questions count:', usedQuestions.size);
      
      // Filter out used questions
      const availableQuestions = questionBank.filter(q => 
        !usedQuestions.has(q.questionId)
      );
      
      console.log('ProblemService: Available questions count:', availableQuestions.length);
      
      // If no questions available, reset session and use all questions
      if (availableQuestions.length === 0) {
        console.log('ProblemService: Resetting session for multiplication', difficulty);
        this.resetSession(difficulty, 'multiplication');
        const resetQuestions = questionBank.slice(); // Copy all questions
        const selectedQuestion = resetQuestions[Math.floor(Math.random() * resetQuestions.length)];
        this.markQuestionUsed(difficulty, 'multiplication', selectedQuestion.questionId);
        
        const problem = {
          id: `mult_${Date.now()}_${this.currentId++}`,
          type: 'multiplication',
          operand1: selectedQuestion.operand1,
          operand2: selectedQuestion.operand2,
          answer: selectedQuestion.answer,
          difficulty: selectedQuestion.difficulty,
          createdAt: new Date().toISOString()
        };
        
        console.log('ProblemService: Generated multiplication problem (after reset):', problem);
        this.problems.push(problem);
        return { ...problem };
      }
      
      // Select random question from available ones
      const selectedQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      this.markQuestionUsed(difficulty, 'multiplication', selectedQuestion.questionId);
      
      const problem = {
        id: `mult_${Date.now()}_${this.currentId++}`,
        type: 'multiplication',
        operand1: selectedQuestion.operand1,
        operand2: selectedQuestion.operand2,
        answer: selectedQuestion.answer,
        difficulty: selectedQuestion.difficulty,
        createdAt: new Date().toISOString()
      };
      
      console.log('ProblemService: Generated multiplication problem:', problem);
      this.problems.push(problem);
      return { ...problem };
    } catch (error) {
      console.error('ProblemService: Error generating multiplication problem:', error);
      throw error;
    }
  }

async generateDivision(minDivisor, maxDivisor) {
    await delay(200);
    
    try {
      console.log('ProblemService: Generating division with range:', minDivisor, 'to', maxDivisor);
      
      const difficulty = this.getDifficultyFromRange(minDivisor, maxDivisor, 'division');
      console.log('ProblemService: Determined difficulty:', difficulty);
      
      const questionBank = this.questionBanks.division[difficulty];
      if (!questionBank || questionBank.length === 0) {
        throw new Error(`No question bank found for division difficulty: ${difficulty}`);
      }
      
      console.log('ProblemService: Question bank size:', questionBank.length);
      
      const usedQuestions = this.getUsedQuestions(difficulty, 'division');
      console.log('ProblemService: Used questions count:', usedQuestions.size);
      
      // Filter out used questions
      const availableQuestions = questionBank.filter(q => 
        !usedQuestions.has(q.questionId)
      );
      
      console.log('ProblemService: Available questions count:', availableQuestions.length);
      
      // If no questions available, reset session and use all questions
      if (availableQuestions.length === 0) {
        console.log('ProblemService: Resetting session for division', difficulty);
        this.resetSession(difficulty, 'division');
        const resetQuestions = questionBank.slice(); // Copy all questions
        const selectedQuestion = resetQuestions[Math.floor(Math.random() * resetQuestions.length)];
        this.markQuestionUsed(difficulty, 'division', selectedQuestion.questionId);
        
        const problem = {
          id: `div_${Date.now()}_${this.currentId++}`,
          type: 'division',
          operand1: selectedQuestion.operand1,
          operand2: selectedQuestion.operand2,
          answer: selectedQuestion.answer,
          difficulty: selectedQuestion.difficulty,
          createdAt: new Date().toISOString()
        };
        
        console.log('ProblemService: Generated division problem (after reset):', problem);
        this.problems.push(problem);
        return { ...problem };
      }
      
      // Select random question from available ones
      const selectedQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      this.markQuestionUsed(difficulty, 'division', selectedQuestion.questionId);
      
      const problem = {
        id: `div_${Date.now()}_${this.currentId++}`,
        type: 'division',
        operand1: selectedQuestion.operand1,
        operand2: selectedQuestion.operand2,
        answer: selectedQuestion.answer,
        difficulty: selectedQuestion.difficulty,
        createdAt: new Date().toISOString()
      };
      
      console.log('ProblemService: Generated division problem:', problem);
      this.problems.push(problem);
      return { ...problem };
    } catch (error) {
      console.error('ProblemService: Error generating division problem:', error);
      throw error;
    }
  }

  async generateAddition(minNumber, maxNumber) {
    await delay(200);
    
    const num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    const num2 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    
    const problem = {
      id: `add_${Date.now()}_${this.currentId++}`,
      type: 'addition',
      operand1: num1,
      operand2: num2,
      answer: num1 + num2,
      createdAt: new Date().toISOString()
    };
    
    this.problems.push(problem);
    return { ...problem };
  }

  async generateSubtraction(minNumber, maxNumber) {
    await delay(200);
    
    const num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber + 5;
    const num2 = Math.floor(Math.random() * (num1 - minNumber + 1)) + minNumber;
    
    const problem = {
      id: `sub_${Date.now()}_${this.currentId++}`,
      type: 'subtraction',
      operand1: num1,
      operand2: num2,
      answer: num1 - num2,
      createdAt: new Date().toISOString()
    };
    
    this.problems.push(problem);
    return { ...problem };
  }
// Get available question count for a difficulty/operation combination
  getAvailableQuestionCount(difficulty, operation) {
    const questionBank = this.questionBanks[operation]?.[difficulty];
    if (!questionBank) return 0;
    
    const usedQuestions = this.getUsedQuestions(difficulty, operation);
    return questionBank.filter(q => 
      !usedQuestions.has(q.questionId)
    ).length;
  }

  // Get total question count for a difficulty/operation combination
  getTotalQuestionCount(difficulty, operation) {
    const questionBank = this.questionBanks[operation]?.[difficulty];
    return questionBank ? questionBank.length : 0;
  }

  async getAll() {
    await delay(200);
    return [...this.problems];
  }

  async getById(id) {
    await delay(200);
    const problem = this.problems.find(p => p.id === id);
    return problem ? { ...problem } : null;
  }

  async create(problem) {
    await delay(300);
    const newProblem = {
      ...problem,
id: `custom_${Date.now()}_${this.currentId++}`,
      createdAt: new Date().toISOString()
    };
    this.problems.push(newProblem);
    return { ...newProblem };
  }
}

export default ProblemService;