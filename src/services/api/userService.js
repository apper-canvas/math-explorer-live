import { users } from '@/services/mockData/users.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let currentUser = null;

export const userService = {
  async login(credentials) {
    await delay(400);
    const { username, password } = credentials;
    
    const user = users.find(u => 
      (u.username === username || u.email === username) && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Don't return password in response
    const { password: _, ...userWithoutPassword } = user;
    currentUser = userWithoutPassword;
    
    // Store in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  },

  async register(userData) {
    await delay(500);
    const { username, email, password, firstName, lastName, age } = userData;
    
    // Check if user already exists
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      firstName,
      lastName,
      age,
      readingLevel: age <= 6 ? 'beginner' : age <= 9 ? 'intermediate' : 'advanced',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      createdAt: new Date().toISOString(),
      preferences: {
        theme: 'light',
        autoplay: true,
        fontSize: 'medium'
      },
      stats: {
        storiesRead: 0,
        totalReadingTime: 0,
        streakDays: 0,
        favoriteCategory: null
      }
    };
    
    // Add to mock database
    users.push({ ...newUser, password });
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  },

  async getCurrentUser() {
    await delay(100);
    
    // Check localStorage first
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      currentUser = JSON.parse(stored);
      return currentUser;
    }
    
    return null;
  },

  async updateProfile(userId, updates) {
    await delay(300);
    
    if (!currentUser || currentUser.id !== userId) {
      throw new Error('Unauthorized');
    }
    
    const updatedUser = { ...currentUser, ...updates };
    currentUser = updatedUser;
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return updatedUser;
  },

  async logout() {
    await delay(200);
    currentUser = null;
    localStorage.removeItem('currentUser');
    return { success: true };
  },

  async updateReadingProgress(userId, storyId, progress) {
    await delay(200);
    
    if (!currentUser || currentUser.id !== userId) {
      throw new Error('Unauthorized');
    }
    
    // Update user stats
    const updatedStats = { 
      ...currentUser.stats,
      storiesRead: currentUser.stats.storiesRead + (progress.completed ? 1 : 0),
      totalReadingTime: currentUser.stats.totalReadingTime + (progress.timeSpent || 0)
    };
    
    currentUser = { ...currentUser, stats: updatedStats };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    return { success: true, stats: updatedStats };
  }
};