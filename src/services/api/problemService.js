const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProblemService {
  constructor() {
    this.problems = [];
    this.currentId = 1;
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

  async generateMultiplication(minFactor = 1, maxFactor = 12) {
    await delay(300);
    
    const operand1 = Math.floor(Math.random() * maxFactor) + minFactor;
    const operand2 = Math.floor(Math.random() * maxFactor) + minFactor;
    const answer = operand1 * operand2;
    
    const difficulty = this.getDifficulty(Math.max(operand1, operand2));
    
    const problem = {
      id: `mult_${Date.now()}_${this.currentId++}`,
      type: 'multiplication',
      operand1,
      operand2,
      answer,
      difficulty
    };
    
    this.problems.push(problem);
    return { ...problem };
  }

  async generateDivision(minDivisor = 1, maxDivisor = 12) {
    await delay(300);
    
    // Generate a division problem by starting with multiplication
    const divisor = Math.floor(Math.random() * maxDivisor) + minDivisor;
    const quotient = Math.floor(Math.random() * 12) + 1;
    const dividend = divisor * quotient;
    
    const difficulty = this.getDifficulty(Math.max(dividend, divisor));
    
    const problem = {
      id: `div_${Date.now()}_${this.currentId++}`,
      type: 'division',
      operand1: dividend, // dividend
      operand2: divisor,  // divisor
      answer: quotient,   // quotient
      difficulty
    };
    
    this.problems.push(problem);
    return { ...problem };
  }

  getDifficulty(maxOperand) {
    if (maxOperand <= 5) return 'easy';
    if (maxOperand <= 10) return 'medium';
    return 'hard';
  }

  async create(problem) {
    await delay(300);
    const newProblem = {
      ...problem,
      id: `problem_${Date.now()}_${this.currentId++}`
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
}

export default new ProblemService();