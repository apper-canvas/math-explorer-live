import { quizzes } from '@/services/mockData/quizzes.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const quizService = {
  async getByStoryId(storyId) {
    await delay(200);
    const quiz = quizzes.find(q => q.storyId === storyId);
    if (!quiz) {
      throw new Error('Quiz not found for this story');
    }
    return { ...quiz };
  },

  async submitAnswers(quizId, answers, userId) {
    await delay(400);
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    let score = 0;
    const results = quiz.questions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) score++;
      
      return {
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      };
    });

    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return {
      quizId,
      userId,
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      results,
      completedAt: new Date().toISOString(),
      passed: percentage >= 70
    };
  },

  async getUserResults(userId, storyId = null) {
    await delay(200);
    // Mock user quiz results
    const mockResults = [
      {
        id: '1',
        storyId: 'story-1',
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        completedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2',
        storyId: 'story-2',
        score: 7,
        totalQuestions: 8,
        percentage: 87,
        completedAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    if (storyId) {
      return mockResults.filter(r => r.storyId === storyId);
    }
    return mockResults;
  },

  async getQuizStats(userId) {
    await delay(200);
    // Mock aggregated quiz statistics
    return {
      totalQuizzes: 15,
      averageScore: 82,
      bestScore: 100,
      totalCorrectAnswers: 123,
      totalQuestions: 150,
      improvementTrend: '+5%',
      recentPerformance: [75, 80, 85, 82, 90]
    };
  }
};