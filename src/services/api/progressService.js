import progressData from '../mockData/progress.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProgressService {
  constructor() {
    this.progress = [...progressData];
    this.currentId = this.progress.length + 1;
  }

  async getAll() {
    await delay(250);
    return [...this.progress];
  }

  async getById(id) {
    await delay(250);
    const progress = this.progress.find(p => p.id === id);
    return progress ? { ...progress } : null;
  }

  async create(progress) {
    await delay(300);
    const newProgress = {
      ...progress,
      id: `progress_${Date.now()}_${this.currentId++}`,
      lastSession: new Date().toISOString()
    };
    this.progress.push(newProgress);
    return { ...newProgress };
  }

  async update(id, data) {
    await delay(300);
    const index = this.progress.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Progress not found');
    
    this.progress[index] = { 
      ...this.progress[index], 
      ...data,
      lastSession: new Date().toISOString()
    };
    return { ...this.progress[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.progress.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Progress not found');
    
    this.progress.splice(index, 1);
    return true;
  }

  async updateStats(correctAnswers, totalProblems) {
    await delay(200);
    if (this.progress.length === 0) {
      return await this.create({
        totalProblems,
        accuracy: correctAnswers / totalProblems,
        masteredFacts: [],
        strugglingFacts: []
      });
    }

    const currentProgress = this.progress[0];
    const newTotalProblems = currentProgress.totalProblems + totalProblems;
    const newCorrectAnswers = Math.round(currentProgress.accuracy * currentProgress.totalProblems) + correctAnswers;
    const newAccuracy = newCorrectAnswers / newTotalProblems;

    return await this.update(currentProgress.id, {
      totalProblems: newTotalProblems,
      accuracy: newAccuracy
    });
  }
}

export default new ProgressService();