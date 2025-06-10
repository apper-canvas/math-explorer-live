import sessionData from '../mockData/session.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SessionService {
  constructor() {
    this.sessions = [...sessionData];
    this.currentId = this.sessions.length + 1;
  }

  async getAll() {
    await delay(250);
    return [...this.sessions];
  }

  async getById(id) {
    await delay(250);
    const session = this.sessions.find(s => s.id === id);
    return session ? { ...session } : null;
  }

  async create(session) {
    await delay(300);
    const newSession = {
      ...session,
      id: `session_${Date.now()}_${this.currentId++}`,
      startTime: new Date().toISOString()
    };
    this.sessions.push(newSession);
    return { ...newSession };
  }

  async update(id, data) {
    await delay(300);
    const index = this.sessions.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Session not found');
    
    this.sessions[index] = { ...this.sessions[index], ...data };
    return { ...this.sessions[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.sessions.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Session not found');
    
    this.sessions.splice(index, 1);
    return true;
  }

  async getCurrentSession() {
    await delay(200);
    return this.sessions.length > 0 ? { ...this.sessions[this.sessions.length - 1] } : null;
  }
}

export default new SessionService();