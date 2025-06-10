class LetterService {
  constructor() {
    this.sessionTracking = {
      identification: { Easy: new Set(), Medium: new Set(), Hard: new Set() },
      matching: { Easy: new Set(), Medium: new Set(), Hard: new Set() },
      dragdrop: { Easy: new Set(), Medium: new Set(), Hard: new Set() },
      audio: { Easy: new Set(), Medium: new Set(), Hard: new Set() }
    };

    this.letterBank = {
      Easy: { // A-M
        uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
        lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm']
      },
      Medium: { // N-Z
        uppercase: ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        lowercase: ['n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      },
      Hard: { // Mixed case
        uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      }
    };
  }

  async generateExercise(exerciseType, difficulty) {
    await new Promise(resolve => setTimeout(resolve, 300));

    const sessionSet = this.sessionTracking[exerciseType][difficulty];
    const letterPool = this.letterBank[difficulty];

    // Reset if all exercises completed
    if (sessionSet.size >= 10) {
      sessionSet.clear();
    }

    let exercise;
    let exerciseKey;

    do {
      switch (exerciseType) {
        case 'identification':
          exercise = this.generateIdentificationExercise(letterPool, difficulty);
          break;
        case 'matching':
          exercise = this.generateMatchingExercise(letterPool, difficulty);
          break;
        case 'dragdrop':
          exercise = this.generateDragDropExercise(letterPool, difficulty);
          break;
        case 'audio':
          exercise = this.generateAudioExercise(letterPool, difficulty);
          break;
        default:
          throw new Error(`Unknown exercise type: ${exerciseType}`);
      }
      exerciseKey = `${exercise.targetLetter}-${exercise.correctAnswer}`;
    } while (sessionSet.has(exerciseKey));

    sessionSet.add(exerciseKey);
    exercise.id = Date.now();

    return exercise;
  }

  generateIdentificationExercise(letterPool, difficulty) {
    const allLetters = [...letterPool.uppercase, ...letterPool.lowercase];
    const targetLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
    
    // Generate wrong options
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
      if (randomLetter !== targetLetter && !wrongOptions.includes(randomLetter)) {
        wrongOptions.push(randomLetter);
      }
    }

    // Shuffle options
    const options = this.shuffleArray([targetLetter, ...wrongOptions]);

    return {
      type: 'identification',
      targetLetter,
      options,
      correctAnswer: targetLetter,
      instruction: `Click on the letter "${targetLetter}"`
    };
  }

  generateMatchingExercise(letterPool, difficulty) {
    const upperLetters = letterPool.uppercase;
    const targetUpper = upperLetters[Math.floor(Math.random() * upperLetters.length)];
    const correctLower = targetUpper.toLowerCase();

    // Generate wrong lowercase options
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randomLetter = letterPool.lowercase[Math.floor(Math.random() * letterPool.lowercase.length)];
      if (randomLetter !== correctLower && !wrongOptions.includes(randomLetter)) {
        wrongOptions.push(randomLetter);
      }
    }

    const options = this.shuffleArray([correctLower, ...wrongOptions]);

    return {
      type: 'matching',
      targetLetter: targetUpper,
      options,
      correctAnswer: correctLower,
      instruction: `Match "${targetUpper}" with its lowercase letter`
    };
  }

  generateDragDropExercise(letterPool, difficulty) {
    const numLetters = difficulty === 'Easy' ? 3 : difficulty === 'Medium' ? 4 : 5;
    const selectedLetters = this.shuffleArray([...letterPool.uppercase]).slice(0, numLetters);
    
    const dropZones = selectedLetters.map(letter => ({
      id: letter,
      label: `${letter} zone`,
      correctLetter: letter
    }));

    const draggableLetters = this.shuffleArray([...selectedLetters]);

    return {
      type: 'dragdrop',
      draggableLetters,
      dropZones: this.shuffleArray(dropZones),
      correctAnswer: selectedLetters[0], // For progress tracking
      targetLetter: selectedLetters[0],
      instruction: 'Drag each letter to its correct zone'
    };
  }

  generateAudioExercise(letterPool, difficulty) {
    const allLetters = [...letterPool.uppercase, ...letterPool.lowercase];
    const targetLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
    
    // Generate wrong options
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
      if (randomLetter !== targetLetter && !wrongOptions.includes(randomLetter)) {
        wrongOptions.push(randomLetter);
      }
    }

    const options = this.shuffleArray([targetLetter, ...wrongOptions]);

    return {
      type: 'audio',
      targetLetter,
      options,
      correctAnswer: targetLetter,
      instruction: `Listen and click on the letter you hear`
    };
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async updateProgress(exerciseType, difficulty, isCorrect) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In a real app, this would save to a backend
    const progressKey = `letterRecognition_${exerciseType}_${difficulty}`;
    const existing = JSON.parse(localStorage.getItem(progressKey) || '{"correct": 0, "total": 0}');
    
    const updated = {
      correct: existing.correct + (isCorrect ? 1 : 0),
      total: existing.total + 1,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(progressKey, JSON.stringify(updated));
    return updated;
  }

  async getProgress(exerciseType, difficulty) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const progressKey = `letterRecognition_${exerciseType}_${difficulty}`;
    return JSON.parse(localStorage.getItem(progressKey) || '{"correct": 0, "total": 0}');
  }

  async getAllProgress() {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const progress = {};
    const exerciseTypes = ['identification', 'matching', 'dragdrop', 'audio'];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    
    for (const type of exerciseTypes) {
      progress[type] = {};
      for (const diff of difficulties) {
        progress[type][diff] = await this.getProgress(type, diff);
      }
    }
    
    return progress;
  }

  resetSession(exerciseType, difficulty) {
    if (exerciseType && difficulty) {
      this.sessionTracking[exerciseType][difficulty].clear();
    } else {
      // Reset all sessions
      Object.keys(this.sessionTracking).forEach(type => {
        Object.keys(this.sessionTracking[type]).forEach(diff => {
          this.sessionTracking[type][diff].clear();
        });
      });
    }
  }

  getLetterInfo(letter) {
    const isUppercase = letter === letter.toUpperCase();
    const isLowercase = letter === letter.toLowerCase();
    
    return {
      letter,
      isUppercase,
      isLowercase,
      pair: isUppercase ? letter.toLowerCase() : letter.toUpperCase(),
      alphabetPosition: letter.toLowerCase().charCodeAt(0) - 96
    };
  }
}

const letterService = new LetterService();
export default letterService;