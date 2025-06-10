class SentenceService {
  constructor() {
    this.wordBanks = this.initializeWordBanks();
    this.sentenceTemplates = this.initializeSentenceTemplates();
    this.grammarRules = this.initializeGrammarRules();
    this.sessionTracking = {
      basic: { Easy: new Set(), Medium: new Set(), Hard: new Set() },
      guided: { Easy: new Set(), Medium: new Set(), Hard: new Set() },
      free: { Easy: new Set(), Medium: new Set(), Hard: new Set() }
    };
  }

  initializeWordBanks() {
    return {
      Easy: {
        phonics: {
          cvc: ['cat', 'dog', 'run', 'big', 'red', 'sun', 'hat', 'map', 'pen', 'box'],
          cvce: ['cake', 'like', 'home', 'cute', 'make', 'take', 'ride', 'game', 'time', 'hope'],
          blends: ['stop', 'play', 'tree', 'frog', 'blue', 'glad', 'swim', 'snap', 'spin', 'trip']
        },
        sightWords: ['the', 'and', 'is', 'in', 'it', 'on', 'at', 'to', 'go', 'we', 'my', 'you', 'are', 'see', 'can'],
        common: ['I', 'a', 'am', 'he', 'she', 'up', 'no', 'yes', 'mom', 'dad', 'fun', 'new', 'old', 'good', 'bad']
      },
      Medium: {
        phonics: {
          digraphs: ['ship', 'that', 'when', 'with', 'they', 'this', 'much', 'what', 'fish', 'wash'],
          longVowels: ['train', 'green', 'night', 'boat', 'fruit', 'dream', 'might', 'clean', 'brain', 'coast'],
          rControlled: ['car', 'her', 'bird', 'for', 'hurt', 'farm', 'girl', 'turn', 'park', 'work']
        },
        sightWords: ['have', 'said', 'each', 'which', 'their', 'would', 'there', 'could', 'other', 'been'],
        common: ['very', 'well', 'also', 'back', 'find', 'here', 'just', 'know', 'made', 'only', 'over', 'take', 'than', 'them', 'want']
      },
      Hard: {
        phonics: {
          multisyllable: ['elephant', 'beautiful', 'important', 'fantastic', 'remember', 'understand', 'wonderful', 'together', 'different', 'birthday'],
          complex: ['through', 'thought', 'brought', 'caught', 'taught', 'because', 'believe', 'friend', 'enough', 'island']
        },
        sightWords: ['although', 'however', 'therefore', 'because', 'between', 'another', 'without', 'against', 'through', 'around'],
        common: ['always', 'before', 'during', 'example', 'change', 'create', 'number', 'family', 'school', 'water', 'world', 'small', 'large', 'great', 'place']
      }
    };
  }

  initializeSentenceTemplates() {
    return {
      Easy: [
        { pattern: ['article', 'noun', 'verb'], example: 'The cat runs.', type: 'simple' },
        { pattern: ['noun', 'verb', 'adjective'], example: 'Dogs are big.', type: 'descriptive' },
        { pattern: ['pronoun', 'verb', 'noun'], example: 'I see you.', type: 'action' },
        { pattern: ['article', 'adjective', 'noun'], example: 'A red hat.', type: 'phrase' },
        { pattern: ['pronoun', 'verb', 'adverb'], example: 'We go up.', type: 'directional' }
      ],
      Medium: [
        { pattern: ['article', 'adjective', 'noun', 'verb', 'adverb'], example: 'The big dog runs fast.', type: 'descriptive' },
        { pattern: ['pronoun', 'verb', 'preposition', 'article', 'noun'], example: 'She sits on the chair.', type: 'locative' },
        { pattern: ['noun', 'conjunction', 'noun', 'verb'], example: 'Mom and dad work.', type: 'compound' },
        { pattern: ['pronoun', 'verb', 'article', 'adjective', 'noun'], example: 'I have a green book.', type: 'possessive' },
        { pattern: ['article', 'noun', 'verb', 'preposition', 'noun'], example: 'The bird flies to home.', type: 'movement' }
      ],
      Hard: [
        { pattern: ['article', 'adjective', 'noun', 'verb', 'adverb', 'conjunction', 'pronoun', 'verb'], example: 'The beautiful flower blooms quickly and it grows.', type: 'complex' },
        { pattern: ['pronoun', 'verb', 'conjunction', 'pronoun', 'verb', 'article', 'adjective', 'noun'], example: 'I think that you need a new book.', type: 'dependent' },
        { pattern: ['preposition', 'article', 'noun', 'pronoun', 'verb', 'adverb'], example: 'During the day we play outside.', type: 'temporal' },
        { pattern: ['article', 'noun', 'verb', 'conjunction', 'article', 'noun', 'verb'], example: 'The cat sleeps and the dog plays.', type: 'compound' },
        { pattern: ['pronoun', 'verb', 'article', 'noun', 'preposition', 'article', 'adjective', 'noun'], example: 'She reads the book about the old castle.', type: 'prepositional' }
      ]
    };
  }

  initializeGrammarRules() {
    return {
      wordTypes: {
        article: ['the', 'a', 'an'],
        noun: ['cat', 'dog', 'book', 'car', 'tree', 'house', 'bird', 'fish', 'ball', 'toy', 'mom', 'dad', 'boy', 'girl'],
        verb: ['runs', 'jumps', 'plays', 'sleeps', 'eats', 'reads', 'walks', 'sits', 'stands', 'flies', 'swims', 'goes', 'comes', 'sees'],
        adjective: ['big', 'small', 'red', 'blue', 'happy', 'sad', 'fast', 'slow', 'old', 'new', 'good', 'bad', 'hot', 'cold'],
        pronoun: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
        adverb: ['quickly', 'slowly', 'up', 'down', 'here', 'there', 'now', 'then', 'well', 'fast'],
        preposition: ['on', 'in', 'at', 'to', 'from', 'with', 'by', 'for', 'of', 'about', 'under', 'over'],
        conjunction: ['and', 'but', 'or', 'so', 'because', 'when', 'if', 'that']
      },
      sentenceStarters: {
        Easy: ['The', 'A', 'I', 'We', 'You', 'He', 'She', 'It'],
        Medium: ['During', 'When', 'If', 'Because', 'After', 'Before', 'While', 'Since'],
        Hard: ['Although', 'However', 'Therefore', 'Nevertheless', 'Furthermore', 'Meanwhile', 'Consequently', 'Additionally']
      }
    };
  }

  normalizeDifficulty(difficulty) {
    if (!difficulty) return 'Easy';
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
  }

  async generateExercise(exerciseType, difficulty) {
    await new Promise(resolve => setTimeout(resolve, 300));

    const normalizedDifficulty = this.normalizeDifficulty(difficulty);
    
    if (!this.sessionTracking[exerciseType]) {
      throw new Error(`Unknown exercise type: ${exerciseType}`);
    }

    const sessionSet = this.sessionTracking[exerciseType][normalizedDifficulty];
    if (!sessionSet) {
      throw new Error(`Invalid difficulty level: ${normalizedDifficulty}`);
    }

    // Reset if all exercises completed
    if (sessionSet.size >= 10) {
      sessionSet.clear();
    }

    let exercise;
    let exerciseKey;

    do {
      switch (exerciseType) {
        case 'basic':
          exercise = this.generateBasicExercise(normalizedDifficulty);
          break;
        case 'guided':
          exercise = this.generateGuidedExercise(normalizedDifficulty);
          break;
        case 'free':
          exercise = this.generateFreeExercise(normalizedDifficulty);
          break;
        default:
          throw new Error(`Unknown exercise type: ${exerciseType}`);
      }
      exerciseKey = `${exercise.targetSentence}-${exercise.words.join('-')}`;
    } while (sessionSet.has(exerciseKey));

    sessionSet.add(exerciseKey);
    exercise.id = Date.now();

    return exercise;
  }

  generateBasicExercise(difficulty) {
    const templates = this.sentenceTemplates[difficulty];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const words = this.generateWordsForTemplate(template.pattern, difficulty);
    const targetSentence = words.join(' ') + '.';
    
    // Add some distractor words
    const distractors = this.generateDistractorWords(words, difficulty, 3);
    const allWords = this.shuffleArray([...words, ...distractors]);

    return {
      type: 'basic',
      difficulty,
      template: template.pattern,
      words: allWords,
      targetSentence,
      correctWords: words,
      instruction: 'Drag the words to build a complete sentence.',
      hint: `Try to make a sentence like: "${template.example}"`,
      dropZones: words.length,
      maxWords: words.length
    };
  }

  generateGuidedExercise(difficulty) {
    const templates = this.sentenceTemplates[difficulty];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const words = this.generateWordsForTemplate(template.pattern, difficulty);
    const targetSentence = words.join(' ') + '.';
    
    // Create guided prompts for each position
    const guidedPrompts = template.pattern.map((type, index) => ({
      position: index,
      type,
      hint: this.getWordTypeHint(type),
      suggestions: this.getSuggestionsForType(type, difficulty)
    }));

    // Add some distractor words
    const distractors = this.generateDistractorWords(words, difficulty, 4);
    const allWords = this.shuffleArray([...words, ...distractors]);

    return {
      type: 'guided',
      difficulty,
      template: template.pattern,
      words: allWords,
      targetSentence,
      correctWords: words,
      guidedPrompts,
      instruction: 'Follow the prompts to build the sentence step by step.',
      hint: `Building a ${template.type} sentence.`,
      dropZones: words.length,
      maxWords: words.length
    };
  }

  generateFreeExercise(difficulty) {
    const wordBank = this.wordBanks[difficulty];
    const allAvailableWords = [
      ...wordBank.phonics.cvc || [],
      ...wordBank.phonics.cvce || [],
      ...wordBank.phonics.blends || [],
      ...wordBank.phonics.digraphs || [],
      ...wordBank.phonics.longVowels || [],
      ...wordBank.phonics.rControlled || [],
      ...wordBank.phonics.multisyllable || [],
      ...wordBank.phonics.complex || [],
      ...wordBank.sightWords,
      ...wordBank.common,
      ...this.grammarRules.wordTypes.article,
      ...this.grammarRules.wordTypes.noun,
      ...this.grammarRules.wordTypes.verb,
      ...this.grammarRules.wordTypes.adjective,
      ...this.grammarRules.wordTypes.pronoun,
      ...this.grammarRules.wordTypes.adverb,
      ...this.grammarRules.wordTypes.preposition,
      ...this.grammarRules.wordTypes.conjunction
    ];

    // Remove duplicates and select random words
    const uniqueWords = [...new Set(allAvailableWords)];
    const selectedWords = this.shuffleArray(uniqueWords).slice(0, difficulty === 'Easy' ? 12 : difficulty === 'Medium' ? 15 : 18);

    return {
      type: 'free',
      difficulty,
      words: selectedWords,
      instruction: 'Create your own sentence using any combination of words.',
      hint: 'Remember: sentences start with a capital letter and end with a period.',
      dropZones: 8, // Maximum sentence length
      maxWords: selectedWords.length,
      freeMode: true
    };
  }

  generateWordsForTemplate(pattern, difficulty) {
    const words = [];
    const wordBank = this.wordBanks[difficulty];
    const grammarRules = this.grammarRules;

    pattern.forEach(wordType => {
      let availableWords = [];
      
      switch (wordType) {
        case 'article':
          availableWords = grammarRules.wordTypes.article;
          break;
        case 'noun':
          availableWords = [
            ...grammarRules.wordTypes.noun,
            ...Object.values(wordBank.phonics).flat()
          ];
          break;
        case 'verb':
          availableWords = grammarRules.wordTypes.verb;
          break;
        case 'adjective':
          availableWords = grammarRules.wordTypes.adjective;
          break;
        case 'pronoun':
          availableWords = grammarRules.wordTypes.pronoun;
          break;
        case 'adverb':
          availableWords = grammarRules.wordTypes.adverb;
          break;
        case 'preposition':
          availableWords = grammarRules.wordTypes.preposition;
          break;
        case 'conjunction':
          availableWords = grammarRules.wordTypes.conjunction;
          break;
        default:
          availableWords = wordBank.sightWords;
      }

      const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      words.push(selectedWord);
    });

    return words;
  }

  generateDistractorWords(correctWords, difficulty, count) {
    const wordBank = this.wordBanks[difficulty];
    const allWords = [
      ...Object.values(wordBank.phonics).flat(),
      ...wordBank.sightWords,
      ...wordBank.common,
      ...Object.values(this.grammarRules.wordTypes).flat()
    ];

    const distractors = [];
    const usedWords = new Set(correctWords);

    while (distractors.length < count) {
      const word = allWords[Math.floor(Math.random() * allWords.length)];
      if (!usedWords.has(word)) {
        distractors.push(word);
        usedWords.add(word);
      }
    }

    return distractors;
  }

  getWordTypeHint(wordType) {
    const hints = {
      article: 'Choose a word like "the" or "a"',
      noun: 'Choose a person, place, or thing',
      verb: 'Choose an action word',
      adjective: 'Choose a describing word',
      pronoun: 'Choose a word like "I", "you", or "he"',
      adverb: 'Choose a word that describes how something is done',
      preposition: 'Choose a word like "on", "in", or "at"',
      conjunction: 'Choose a connecting word like "and" or "but"'
    };
    
    return hints[wordType] || 'Choose the right word for this position';
  }

  getSuggestionsForType(wordType, difficulty) {
    const grammarRules = this.grammarRules;
    const suggestions = grammarRules.wordTypes[wordType] || [];
    
    // Limit suggestions based on difficulty
    const maxSuggestions = difficulty === 'Easy' ? 3 : difficulty === 'Medium' ? 4 : 5;
    return this.shuffleArray(suggestions).slice(0, maxSuggestions);
  }

  validateSentence(words, exerciseData) {
    if (!words || words.length === 0) {
      return {
        isValid: false,
        score: 0,
        feedback: 'Your sentence is empty. Try adding some words!',
        suggestions: ['Start with a capital letter', 'Add a noun or pronoun', 'Include a verb']
      };
    }

    // For free mode, use basic grammar validation
    if (exerciseData.freeMode) {
      return this.validateFreeFormSentence(words);
    }

    // For guided exercises, check against target
    if (exerciseData.type === 'guided' || exerciseData.type === 'basic') {
      return this.validateTargetSentence(words, exerciseData);
    }

    return { isValid: false, score: 0, feedback: 'Unknown exercise type' };
  }

  validateTargetSentence(words, exerciseData) {
    const correctWords = exerciseData.correctWords;
    const isExactMatch = words.length === correctWords.length && 
                        words.every((word, index) => word.toLowerCase() === correctWords[index].toLowerCase());

    if (isExactMatch) {
      return {
        isValid: true,
        score: 100,
        feedback: 'Perfect! You built the sentence correctly!',
        suggestions: []
      };
    }

    // Check partial correctness
    let correctPositions = 0;
    const feedback = [];
    const suggestions = [];

    words.forEach((word, index) => {
      if (index < correctWords.length && word.toLowerCase() === correctWords[index].toLowerCase()) {
        correctPositions++;
      } else if (index < correctWords.length) {
        feedback.push(`Position ${index + 1}: Expected "${correctWords[index]}", got "${word}"`);
        suggestions.push(`Try "${correctWords[index]}" at position ${index + 1}`);
      }
    });

    const score = Math.round((correctPositions / correctWords.length) * 100);

    return {
      isValid: score >= 80,
      score,
      feedback: score >= 80 ? 'Great job! Almost perfect!' : 'Good try! Check the highlighted words.',
      suggestions: suggestions.slice(0, 3),
      correctPositions,
      totalPositions: correctWords.length
    };
  }

  validateFreeFormSentence(words) {
    const score = this.calculateGrammarScore(words);
    const feedback = this.generateGrammarFeedback(words, score);
    const suggestions = this.generateGrammarSuggestions(words);

    return {
      isValid: score >= 60,
      score,
      feedback: feedback,
      suggestions: suggestions.slice(0, 3)
    };
  }

  calculateGrammarScore(words) {
    let score = 0;
    const maxScore = 100;

    // Check for basic sentence structure
    if (words.length >= 2) score += 20; // Has at least 2 words
    if (words.length >= 3) score += 10; // Has at least 3 words
    
    // Check for capital letter (assuming first word should be capitalized)
    if (words[0] && words[0][0] === words[0][0].toUpperCase()) score += 15;

    // Check for noun or pronoun
    if (words.some(word => this.grammarRules.wordTypes.noun.includes(word.toLowerCase()) || 
                          this.grammarRules.wordTypes.pronoun.includes(word.toLowerCase()))) {
      score += 20;
    }

    // Check for verb
    if (words.some(word => this.grammarRules.wordTypes.verb.includes(word.toLowerCase()))) {
      score += 25;
    }

    // Check for article
    if (words.some(word => this.grammarRules.wordTypes.article.includes(word.toLowerCase()))) {
      score += 10;
    }

    return Math.min(score, maxScore);
  }

  generateGrammarFeedback(words, score) {
    if (score >= 80) return 'Excellent sentence! Great grammar!';
    if (score >= 60) return 'Good sentence! Nice job!';
    if (score >= 40) return 'Good start! Try adding more words.';
    return 'Keep trying! Remember: sentences need a person/thing and an action.';
  }

  generateGrammarSuggestions(words) {
    const suggestions = [];
    const hasNoun = words.some(word => this.grammarRules.wordTypes.noun.includes(word.toLowerCase()) || 
                                     this.grammarRules.wordTypes.pronoun.includes(word.toLowerCase()));
    const hasVerb = words.some(word => this.grammarRules.wordTypes.verb.includes(word.toLowerCase()));
    const hasArticle = words.some(word => this.grammarRules.wordTypes.article.includes(word.toLowerCase()));

    if (!hasNoun) suggestions.push('Add a person, place, or thing (noun)');
    if (!hasVerb) suggestions.push('Add an action word (verb)');
    if (!hasArticle) suggestions.push('Try starting with "The" or "A"');
    if (words.length < 3) suggestions.push('Try making your sentence longer');
    if (words.length > 0 && words[0][0] !== words[0][0].toUpperCase()) {
      suggestions.push('Start your sentence with a capital letter');
    }

    return suggestions;
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async updateProgress(exerciseType, difficulty, isCorrect, completionTime, sentenceLength) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const normalizedDifficulty = this.normalizeDifficulty(difficulty);
    
    try {
      const progressKey = `sentenceBuilding_${exerciseType}_${normalizedDifficulty}`;
      const existing = JSON.parse(localStorage.getItem(progressKey) || '{"correct": 0, "total": 0, "avgTime": 0, "avgLength": 0}');
      
      const updated = {
        correct: existing.correct + (isCorrect ? 1 : 0),
        total: existing.total + 1,
        avgTime: ((existing.avgTime * existing.total) + completionTime) / (existing.total + 1),
        avgLength: ((existing.avgLength * existing.total) + sentenceLength) / (existing.total + 1),
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(progressKey, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error updating progress:', error);
      return { correct: 0, total: 0, avgTime: 0, avgLength: 0 };
    }
  }

  async getProgress(exerciseType, difficulty) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const normalizedDifficulty = this.normalizeDifficulty(difficulty);
    
    try {
      const progressKey = `sentenceBuilding_${exerciseType}_${normalizedDifficulty}`;
      return JSON.parse(localStorage.getItem(progressKey) || '{"correct": 0, "total": 0, "avgTime": 0, "avgLength": 0}');
    } catch (error) {
      console.error('Error getting progress:', error);
      return { correct: 0, total: 0, avgTime: 0, avgLength: 0 };
    }
  }

  async getAllProgress() {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const progress = {};
    const exerciseTypes = ['basic', 'guided', 'free'];
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
      const normalizedDifficulty = this.normalizeDifficulty(difficulty);
      
      if (this.sessionTracking[exerciseType] && this.sessionTracking[exerciseType][normalizedDifficulty]) {
        this.sessionTracking[exerciseType][normalizedDifficulty].clear();
      }
    } else {
      // Reset all sessions
      Object.keys(this.sessionTracking).forEach(type => {
        Object.keys(this.sessionTracking[type]).forEach(diff => {
          if (this.sessionTracking[type][diff]) {
            this.sessionTracking[type][diff].clear();
          }
        });
      });
    }
  }

  getWordInfo(word) {
    const wordTypes = [];
    
    Object.entries(this.grammarRules.wordTypes).forEach(([type, words]) => {
      if (words.includes(word.toLowerCase())) {
        wordTypes.push(type);
      }
    });

    return {
      word,
      types: wordTypes,
      isSightWord: Object.values(this.wordBanks).some(bank => bank.sightWords.includes(word.toLowerCase())),
      phonicsCategory: this.getPhonicsCategory(word)
    };
  }

  getPhonicsCategory(word) {
    for (const [difficulty, bank] of Object.entries(this.wordBanks)) {
      for (const [category, words] of Object.entries(bank.phonics)) {
        if (words.includes(word.toLowerCase())) {
          return { difficulty, category };
        }
      }
    }
    return null;
  }
}

const sentenceService = new SentenceService();
export default sentenceService;