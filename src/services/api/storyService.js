import { stories } from '@/services/mockData/stories.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const storyService = {
  async getAll() {
    await delay(300);
    return [...stories];
  },

  async getById(id) {
    await delay(200);
    const story = stories.find(s => s.id === id);
    if (!story) {
      throw new Error('Story not found');
    }
    return { ...story };
  },

  async getByCategory(category) {
    await delay(250);
    return stories.filter(s => s.category === category);
  },

  async getFeatured() {
    await delay(200);
    return stories.filter(s => s.featured).slice(0, 3);
  },

  async getRecentlyRead(userId) {
    await delay(200);
    // In a real app, this would filter by user's reading history
    return stories.slice(0, 5);
  },

  async markAsRead(storyId, userId) {
    await delay(300);
    // In a real app, this would update user's reading progress
    return { success: true, storyId, userId, timestamp: new Date().toISOString() };
  },

  async updateProgress(storyId, userId, progress) {
    await delay(200);
    // In a real app, this would save reading progress to backend
    return { 
      success: true, 
      storyId, 
      userId, 
      progress, 
      timestamp: new Date().toISOString() 
    };
  },

  async getProgress(storyId, userId) {
    await delay(150);
    // Mock progress data
    return {
      storyId,
      userId,
      currentChapter: 1,
      totalChapters: 5,
      completionPercentage: 20,
      lastReadAt: new Date().toISOString()
    };
  }
};