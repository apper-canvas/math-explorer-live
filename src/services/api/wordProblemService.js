const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class WordProblemService {
  constructor() {
    this.problems = [];
    this.currentId = 1;
    this.templates = this.initializeTemplates();
    this.difficultyQuestionBanks = this.initializeDifficultyBanks();
    this.sessionTracking = new Map(); // Track used questions per difficulty/operation
  }

  initializeTemplates() {
    return {
      addition: {
        shopping: [
          {
            template: "{name} bought {operand1} {item1} and {operand2} {item2} at the store.",
            question: "How many items did {name} buy in total?",
            items: ['apples', 'oranges', 'bananas', 'books', 'toys', 'pencils']
          },
          {
            template: "{name} has ${operand1} and earns ${operand2} more.",
            question: "How much money does {name} have now?",
            items: ['dollars']
          }
        ],
        food: [
          {
            template: "{name} baked {operand1} cookies in the morning and {operand2} cookies in the afternoon.",
            question: "How many cookies did {name} bake in total?",
            items: ['cookies', 'muffins', 'cupcakes']
          }
        ],
        sports: [
          {
            template: "{name} scored {operand1} points in the first game and {operand2} points in the second game.",
            question: "How many points did {name} score altogether?",
            items: ['points']
          }
        ],
        school: [
          {
            template: "{name} read {operand1} pages yesterday and {operand2} pages today.",
            question: "How many pages has {name} read in total?",
            items: ['pages', 'books', 'chapters']
          }
        ],
        animals: [
          {
            template: "There are {operand1} birds in one tree and {operand2} birds in another tree.",
            question: "How many birds are there in total?",
            items: ['birds', 'squirrels', 'butterflies']
          }
        ],
        travel: [
          {
            template: "{name} traveled {operand1} miles on Monday and {operand2} miles on Tuesday.",
            question: "How many miles did {name} travel in total?",
            items: ['miles', 'kilometers']
          }
        ]
      },
      subtraction: {
        shopping: [
          {
            template: "{name} had {operand1} {item1} and gave away {operand2} of them.",
            question: "How many {item1} does {name} have left?",
            items: ['stickers', 'cards', 'marbles', 'coins']
          }
        ],
        food: [
          {
            template: "{name} had {operand1} cookies and ate {operand2} of them.",
            question: "How many cookies does {name} have left?",
            items: ['cookies', 'candies', 'crackers']
          }
        ],
        sports: [
          {
            template: "The team had {operand1} players, but {operand2} players couldn't make it to the game.",
            question: "How many players showed up for the game?",
            items: ['players']
          }
        ],
        school: [
          {
            template: "{name} had {operand1} homework problems and completed {operand2} of them.",
            question: "How many problems does {name} still need to complete?",
            items: ['problems', 'exercises', 'questions']
          }
        ],
        animals: [
          {
            template: "There were {operand1} ducks in the pond, but {operand2} flew away.",
            question: "How many ducks are still in the pond?",
            items: ['ducks', 'fish', 'frogs']
          }
        ],
        travel: [
          {
            template: "{name} planned to travel {operand1} miles but only traveled {operand2} miles.",
            question: "How many more miles does {name} need to travel?",
            items: ['miles']
          }
        ]
      },
      multiplication: {
        shopping: [
          {
            template: "{name} bought {operand1} packages of {item1}, with {operand2} {item1} in each package.",
            question: "How many {item1} did {name} buy in total?",
            items: ['gum', 'stickers', 'candies', 'erasers']
          }
        ],
        food: [
          {
            template: "{name} made {operand1} batches of cookies, with {operand2} cookies in each batch.",
            question: "How many cookies did {name} make in total?",
            items: ['cookies', 'muffins', 'sandwiches']
          }
        ],
        sports: [
          {
            template: "Each team has {operand1} players and there are {operand2} teams.",
            question: "How many players are there in total?",
            items: ['players']
          }
        ],
        school: [
          {
            template: "There are {operand1} rows of desks with {operand2} desks in each row.",
            question: "How many desks are there in total?",
            items: ['desks', 'chairs', 'books']
          }
        ],
        animals: [
          {
            template: "There are {operand1} nests with {operand2} eggs in each nest.",
            question: "How many eggs are there in total?",
            items: ['eggs', 'chicks', 'birds']
          }
        ],
        travel: [
          {
            template: "{name} travels {operand1} miles per day for {operand2} days.",
            question: "How many miles did {name} travel in total?",
            items: ['miles']
          }
        ]
      },
      division: {
        shopping: [
          {
            template: "{name} has {operand1} {item1} to share equally among {operand2} friends.",
            question: "How many {item1} will each friend get?",
            items: ['candies', 'stickers', 'toys', 'cards']
          }
        ],
        food: [
          {
            template: "{name} has {operand1} cookies to pack into {operand2} boxes equally.",
            question: "How many cookies will go in each box?",
            items: ['cookies', 'muffins', 'apples']
          }
        ],
        sports: [
          {
            template: "There are {operand1} players that need to be divided into {operand2} equal teams.",
            question: "How many players will be on each team?",
            items: ['players']
          }
        ],
        school: [
          {
            template: "The teacher has {operand1} pencils to distribute equally among {operand2} students.",
            question: "How many pencils will each student get?",
            items: ['pencils', 'books', 'worksheets']
          }
        ],
        animals: [
          {
            template: "There are {operand1} fish that need to be put into {operand2} tanks equally.",
            question: "How many fish will go in each tank?",
            items: ['fish', 'birds', 'hamsters']
          }
        ],
        travel: [
          {
            template: "{name} needs to travel {operand1} miles in {operand2} equal trips.",
            question: "How many miles should {name} travel in each trip?",
            items: ['miles']
          }
        ]
      }
    };
}

  initializeDifficultyBanks() {
    return {
      easy: {
        addition: this.generateDifficultyQuestions('addition', 'easy', 1, 10, 10),
        subtraction: this.generateDifficultyQuestions('subtraction', 'easy', 1, 10, 10),
        multiplication: this.generateDifficultyQuestions('multiplication', 'easy', 1, 5, 10),
        division: this.generateDifficultyQuestions('division', 'easy', 1, 5, 10)
      },
      medium: {
        addition: this.generateDifficultyQuestions('addition', 'medium', 10, 50, 10),
        subtraction: this.generateDifficultyQuestions('subtraction', 'medium', 10, 50, 10),
        multiplication: this.generateDifficultyQuestions('multiplication', 'medium', 2, 12, 10),
        division: this.generateDifficultyQuestions('division', 'medium', 2, 12, 10)
      },
      hard: {
        addition: this.generateDifficultyQuestions('addition', 'hard', 50, 100, 10),
        subtraction: this.generateDifficultyQuestions('subtraction', 'hard', 50, 100, 10),
        multiplication: this.generateDifficultyQuestions('multiplication', 'hard', 5, 25, 10),
        division: this.generateDifficultyQuestions('division', 'hard', 5, 25, 10)
      }
    };
  }

  generateDifficultyQuestions(operation, difficulty, minNum, maxNum, count) {
    const questions = [];
    const contexts = ['shopping', 'food', 'sports', 'school', 'animals', 'travel'];
    
    for (let i = 0; i < count; i++) {
      const context = contexts[i % contexts.length];
      let operand1, operand2, answer;
      
      // Generate unique operand combinations for each question
      switch (operation) {
        case 'addition':
          operand1 = minNum + (i * 2) % (maxNum - minNum);
          operand2 = minNum + ((i * 3) + 1) % (maxNum - minNum);
          answer = operand1 + operand2;
          break;
          
        case 'subtraction':
          operand1 = Math.max(minNum + (i * 3), minNum + 5);
          operand2 = minNum + (i % (operand1 - minNum));
          answer = operand1 - operand2;
          break;
          
        case 'multiplication':
          operand1 = Math.max(minNum, minNum + (i % (maxNum - minNum + 1)));
          operand2 = Math.max(minNum, minNum + ((i + 2) % (maxNum - minNum + 1)));
          answer = operand1 * operand2;
          break;
          
        case 'division':
          operand2 = Math.max(minNum, minNum + (i % (maxNum - minNum + 1)));
          answer = Math.max(minNum, minNum + ((i + 1) % (maxNum - minNum + 1)));
          operand1 = operand2 * answer;
          break;
      }
      
      questions.push({
        questionId: `${operation}_${difficulty}_${i + 1}`,
        operand1,
        operand2,
        answer,
        context,
        index: i
      });
    }
    
    return questions;
  }

  getRandomName() {
    const names = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Sage'];
    return names[Math.floor(Math.random() * names.length)];
  }

async generateProblem(parameters, usedQuestions = new Set()) {
    await delay(500);
    
    const { operation, context, difficulty, minNumber, maxNumber } = parameters;
    
    // Get the question bank for this difficulty and operation
    const questionBank = this.difficultyQuestionBanks[difficulty]?.[operation];
    if (!questionBank) {
      throw new Error(`No question bank found for ${difficulty} ${operation}`);
    }
    
    // Filter out used questions
    const availableQuestions = questionBank.filter(q => 
      !usedQuestions.has(`wp_${q.questionId}`)
    );
    
    if (availableQuestions.length === 0) {
      return null; // No more questions available
    }
    
    // Select a question from available ones
    const selectedQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    const { operand1, operand2, answer, context: questionContext } = selectedQuestion;
    
    // Use the question's context or fallback to parameter context
    const finalContext = questionContext || context;
    
    // Get template
    const templates = this.templates[operation][finalContext] || this.templates[operation].shopping;
    const template = templates[selectedQuestion.index % templates.length];
    
    // Generate problem text
    const name = this.getRandomName();
    const item1 = template.items[selectedQuestion.index % template.items.length];
    const item2 = template.items[(selectedQuestion.index + 1) % template.items.length];
    
    let problemText = template.template
      .replace(/{name}/g, name)
      .replace(/{operand1}/g, operand1)
      .replace(/{operand2}/g, operand2)
      .replace(/{item1}/g, item1)
      .replace(/{item2}/g, item2);
    
    let questionText = template.question
      .replace(/{name}/g, name)
      .replace(/{item1}/g, item1)
      .replace(/{item2}/g, item2);

    // Generate visual description
    const visualDescription = this.generateVisualDescription(operation, operand1, operand2, answer, finalContext);
    
    const problem = {
      id: `wp_${selectedQuestion.questionId}`,
      type: 'word_problem',
      operation,
      context: finalContext,
      difficulty,
      text: problemText,
      question: questionText,
      operand1,
      operand2,
      answer,
      minNumber,
      maxNumber,
      visualData: {
        operand1,
        operand2,
        answer,
        operation
      },
      visualDescription,
      explanation: this.generateExplanation(operation, operand1, operand2, answer),
      createdAt: new Date().toISOString()
    };
    
    this.problems.push(problem);
    return { ...problem };
  }

  generateVisualDescription(operation, operand1, operand2, answer, context) {
    const descriptions = {
      addition: `Think of combining ${operand1} items with ${operand2} items to see the total.`,
      subtraction: `Start with ${operand1} items and remove ${operand2} to see what remains.`,
      multiplication: `Imagine ${operand1} groups with ${operand2} items in each group.`,
      division: `Picture sharing ${operand1} items equally among ${operand2} groups.`
    };
    
    return descriptions[operation] || 'Visual representation of the mathematical concept.';
  }

  generateExplanation(operation, operand1, operand2, answer) {
    const explanations = {
      addition: `To solve this, we add ${operand1} + ${operand2} = ${answer}`,
      subtraction: `To solve this, we subtract ${operand1} - ${operand2} = ${answer}`,
      multiplication: `To solve this, we multiply ${operand1} × ${operand2} = ${answer}`,
      division: `To solve this, we divide ${operand1} ÷ ${operand2} = ${answer}`
    };
    
    return explanations[operation] || `The answer is ${answer}`;
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
      id: `wp_custom_${Date.now()}_${this.currentId++}`,
      createdAt: new Date().toISOString()
    };
    this.problems.push(newProblem);
    return { ...newProblem };
  }

  async update(id, data) {
    await delay(300);
    const index = this.problems.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Problem not found');
    
    this.problems[index] = { ...this.problems[index], ...data };
    return { ...this.problems[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.problems.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Problem not found');
    
    this.problems.splice(index, 1);
    return true;
  }

async getByParameters(parameters) {
    await delay(200);
    return this.problems.filter(problem => {
      return (!parameters.operation || problem.operation === parameters.operation) &&
             (!parameters.context || problem.context === parameters.context) &&
             (!parameters.difficulty || problem.difficulty === parameters.difficulty);
    });
  }

  // Get available question count for a difficulty/operation combination
  getAvailableQuestionCount(difficulty, operation, usedQuestions = new Set()) {
    const questionBank = this.difficultyQuestionBanks[difficulty]?.[operation];
    if (!questionBank) return 0;
    
    return questionBank.filter(q => 
      !usedQuestions.has(`wp_${q.questionId}`)
    ).length;
  }

  // Reset session tracking for a new session
  resetSession(difficulty, operation) {
    const key = `${difficulty}_${operation}`;
    this.sessionTracking.delete(key);
  }
}

export default new WordProblemService();