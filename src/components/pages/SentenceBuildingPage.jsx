import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, CheckCircle, XCircle, Star, Lightbulb, HelpCircle, Volume2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import DifficultySelector from '@/components/molecules/DifficultySelector';
import FeedbackMessage from '@/components/molecules/FeedbackMessage';
import PracticeHeader from '@/components/organisms/PracticeHeader';
import sentenceService from '@/services/api/sentenceService';

const SentenceBuildingPage = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [currentExercise, setCurrentExercise] = useState(null);
  const [exerciseType, setExerciseType] = useState('basic');
  const [sentenceWords, setSentenceWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ correct: 0, total: 0, streak: 0 });
  const [draggedWord, setDraggedWord] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  
  const sentenceRef = useRef(null);

  const difficulties = {
    easy: { label: 'Easy (Simple)', color: 'reading-primary', range: 'Basic sentences' },
    medium: { label: 'Medium (Compound)', color: 'reading-secondary', range: 'Complex sentences' },
    hard: { label: 'Hard (Complex)', color: 'reading-accent', range: 'Advanced sentences' }
  };

  const exerciseTypes = [
    { id: 'basic', label: 'Basic Building', icon: '🧱' },
    { id: 'guided', label: 'Guided Practice', icon: '🎯' },
    { id: 'free', label: 'Free Creation', icon: '✨' }
  ];

  const generateExercise = useCallback(async () => {
    setLoading(true);
    setShowFeedback(false);
    setSentenceWords([]);
    setCurrentPromptIndex(0);
    setStartTime(Date.now());

    try {
      const exercise = await sentenceService.generateExercise(exerciseType, difficulty);
      setCurrentExercise(exercise);
      setAvailableWords(exercise.words);
    } catch (error) {
      console.error('Error generating exercise:', error);
      toast.error('Failed to generate exercise');
    } finally {
      setLoading(false);
    }
  }, [exerciseType, difficulty]);

  const speakWord = useCallback((word) => {
    if ('speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const speakSentence = useCallback((words) => {
    if ('speechSynthesis' in window && words.length > 0) {
      const sentence = words.join(' ');
      const utterance = new window.SpeechSynthesisUtterance(sentence);
      utterance.rate = 0.7;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleDragStart = (word, index) => {
    setDraggedWord({ word, index, source: 'available' });
  };

  const handleSentenceDragStart = (word, index) => {
    setDraggedWord({ word, index, source: 'sentence' });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropToSentence = (e, dropIndex) => {
    e.preventDefault();
    if (!draggedWord) return;

    if (draggedWord.source === 'available') {
      // Moving from available words to sentence
      const newSentenceWords = [...sentenceWords];
      newSentenceWords[dropIndex] = draggedWord.word;
      setSentenceWords(newSentenceWords);

      const newAvailableWords = availableWords.filter((_, index) => index !== draggedWord.index);
      setAvailableWords(newAvailableWords);
    } else if (draggedWord.source === 'sentence') {
      // Reordering within sentence
      const newSentenceWords = [...sentenceWords];
      const [removed] = newSentenceWords.splice(draggedWord.index, 1);
      newSentenceWords.splice(dropIndex, 0, removed);
      setSentenceWords(newSentenceWords);
    }

    setDraggedWord(null);
    
    // Auto-advance guided prompts
    if (currentExercise?.type === 'guided' && currentPromptIndex < currentExercise.guidedPrompts?.length - 1) {
      setCurrentPromptIndex(prev => prev + 1);
    }
  };

  const handleDropToAvailable = (e) => {
    e.preventDefault();
    if (!draggedWord || draggedWord.source !== 'sentence') return;

    // Remove word from sentence and return to available
    const newSentenceWords = sentenceWords.filter((_, index) => index !== draggedWord.index);
    setSentenceWords(newSentenceWords);
    setAvailableWords([...availableWords, draggedWord.word]);
    setDraggedWord(null);
  };

  const addWordToSentence = (word, wordIndex) => {
    // Find first empty spot or append
    const emptyIndex = sentenceWords.findIndex(w => w === null || w === undefined);
    const newSentenceWords = [...sentenceWords];
    
    if (emptyIndex !== -1) {
      newSentenceWords[emptyIndex] = word;
    } else if (sentenceWords.length < (currentExercise?.dropZones || 8)) {
      newSentenceWords.push(word);
    } else {
      toast.warning('Sentence is full. Remove a word first.');
      return;
    }

    setSentenceWords(newSentenceWords);
    const newAvailableWords = availableWords.filter((_, index) => index !== wordIndex);
    setAvailableWords(newAvailableWords);

    // Auto-advance guided prompts
    if (currentExercise?.type === 'guided' && currentPromptIndex < currentExercise.guidedPrompts?.length - 1) {
      setCurrentPromptIndex(prev => prev + 1);
    }
  };

  const removeWordFromSentence = (wordIndex) => {
    const removedWord = sentenceWords[wordIndex];
    const newSentenceWords = sentenceWords.filter((_, index) => index !== wordIndex);
    setSentenceWords(newSentenceWords);
    setAvailableWords([...availableWords, removedWord]);
  };

  const validateSentence = useCallback(async () => {
    if (sentenceWords.length === 0) {
      toast.warning('Please add some words to your sentence first!');
      return;
    }

    const completionTime = Date.now() - startTime;
    const validWords = sentenceWords.filter(word => word !== null && word !== undefined);
    
    try {
      const result = await sentenceService.validateSentence(validWords, currentExercise);
      setValidationResult(result);
      setShowFeedback(true);

      // Update progress
      const newProgress = {
        correct: progress.correct + (result.isValid ? 1 : 0),
        total: progress.total + 1,
        streak: result.isValid ? progress.streak + 1 : 0
      };
      setProgress(newProgress);

      // Save progress
      await sentenceService.updateProgress(
        exerciseType, 
        difficulty, 
        result.isValid, 
        completionTime,
        validWords.length
      );

      // Show feedback
      if (result.isValid) {
        toast.success(result.feedback);
        if (result.score === 100) {
          speakSentence(validWords);
        }
      } else {
        toast.error(result.feedback);
      }

      // Auto-generate next exercise after feedback
      setTimeout(() => {
        generateExercise();
      }, 3000);

    } catch (error) {
      console.error('Error validating sentence:', error);
      toast.error('Failed to validate sentence');
    }
  }, [sentenceWords, currentExercise, startTime, progress, generateExercise, speakSentence, exerciseType, difficulty]);

  const clearSentence = () => {
    setAvailableWords([...availableWords, ...sentenceWords.filter(word => word !== null && word !== undefined)]);
    setSentenceWords([]);
    setCurrentPromptIndex(0);
    setStartTime(Date.now());
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  useEffect(() => {
    generateExercise();
  }, [generateExercise]);

  const renderWordBank = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <Text size="lg" weight="semibold" className="text-surface-700">
            Word Bank
          </Text>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAvailableWords(currentExercise?.words || [])}
            className="text-xs"
          >
            Reset Words
          </Button>
        </div>
        
        <div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 min-h-[120px] p-4 bg-surface-50 rounded-lg border-2 border-dashed border-surface-200"
          onDragOver={handleDragOver}
          onDrop={handleDropToAvailable}
        >
          {availableWords.map((word, index) => (
            <motion.div
              key={`${word}-${index}`}
              className="word-card bg-white border-2 border-surface-200 rounded-lg p-3 text-center cursor-move hover:border-reading-primary hover:shadow-md"
              draggable
              onDragStart={() => handleDragStart(word, index)}
              onClick={() => addWordToSentence(word, index)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
              role="button"
              aria-label={`Word: ${word}. Click to add to sentence or drag to position.`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  addWordToSentence(word, index);
                }
              }}
            >
              <Text size="sm" weight="medium" className="text-surface-700">
                {word}
              </Text>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderSentenceBuilder = () => {
    const maxDropZones = currentExercise?.dropZones || 8;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <Text size="lg" weight="semibold" className="text-surface-700">
            Build Your Sentence
          </Text>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => speakSentence(sentenceWords.filter(w => w))}
              disabled={sentenceWords.filter(w => w).length === 0}
              className="flex items-center space-x-1"
            >
              <Volume2 size={16} />
              <span>Listen</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearSentence}
              disabled={sentenceWords.length === 0}
              className="flex items-center space-x-1"
            >
              <RotateCcw size={16} />
              <span>Clear</span>
            </Button>
          </div>
        </div>

        <div 
          ref={sentenceRef}
          className="sentence-drop-zone bg-surface-50 rounded-lg p-6 min-h-[100px] border-2 border-dashed border-surface-300"
          onDragOver={handleDragOver}
        >
          <div className="flex flex-wrap gap-2 items-center min-h-[60px]">
            {Array.from({ length: maxDropZones }, (_, index) => (
              <div
                key={index}
                className={`relative min-w-[80px] h-12 rounded-lg border-2 border-dashed transition-all duration-200 flex items-center justify-center ${
                  sentenceWords[index] 
                    ? 'bg-reading-light border-reading-primary' 
                    : 'border-surface-300 hover:border-reading-primary hover:bg-reading-light/30'
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropToSentence(e, index)}
                role="button"
                tabIndex={0}
                aria-label={`Drop zone ${index + 1}. ${sentenceWords[index] ? `Contains: ${sentenceWords[index]}` : 'Empty'}`}
              >
                {sentenceWords[index] ? (
                  <motion.div
                    className="word-card bg-white border border-reading-primary rounded px-3 py-1 cursor-move"
                    draggable
                    onDragStart={() => handleSentenceDragStart(sentenceWords[index], index)}
                    onClick={() => removeWordFromSentence(index)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Text size="sm" weight="medium" className="text-reading-primary">
                      {sentenceWords[index]}
                    </Text>
                  </motion.div>
                ) : (
                  <Text size="xs" className="text-surface-400">
                    {index + 1}
                  </Text>
                )}
              </div>
            ))}
            {sentenceWords.filter(w => w).length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-2xl text-surface-600"
              >
                .
              </motion.div>
            )}
          </div>
        </div>

        {sentenceWords.filter(w => w).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <Text className="text-lg text-surface-700">
              "{sentenceWords.filter(w => w).join(' ')}."
            </Text>
          </motion.div>
        )}
      </div>
    );
  };

  const renderGuidedPrompts = () => {
    if (!currentExercise?.guidedPrompts) return null;

    const currentPrompt = currentExercise.guidedPrompts[currentPromptIndex];
    if (!currentPrompt) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4"
      >
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {currentPromptIndex + 1}
          </div>
          <Text weight="semibold" className="text-blue-800">
            Step {currentPromptIndex + 1} of {currentExercise.guidedPrompts.length}
          </Text>
        </div>
        
        <Text className="text-blue-700 mb-2">
          {currentPrompt.hint}
        </Text>
        
        {currentPrompt.suggestions && currentPrompt.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Text size="sm" className="text-blue-600 mr-2">Suggestions:</Text>
            {currentPrompt.suggestions.map((suggestion, index) => (
              <span
                key={index}
                className="grammar-suggestion cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  const wordIndex = availableWords.indexOf(suggestion);
                  if (wordIndex !== -1) {
                    addWordToSentence(suggestion, wordIndex);
                  }
                }}
              >
                {suggestion}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  const renderExerciseContent = () => {
    if (!currentExercise || loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-reading-primary"></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Text size="lg" weight="semibold" className="text-surface-700">
              Instructions
            </Text>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleHint}
              className="flex items-center space-x-1"
            >
              <Lightbulb size={16} />
              <span>{showHint ? 'Hide' : 'Show'} Hint</span>
            </Button>
          </div>
          
          <Text className="text-surface-600 mb-2">
            {currentExercise.instruction}
          </Text>
          
          <AnimatePresence>
            {showHint && currentExercise.hint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <HelpCircle size={16} className="text-yellow-600" />
                  <Text size="sm" className="text-yellow-700">
                    {currentExercise.hint}
                  </Text>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guided Prompts */}
        {currentExercise.type === 'guided' && renderGuidedPrompts()}

        {/* Sentence Builder */}
        {renderSentenceBuilder()}

        {/* Word Bank */}
        {renderWordBank()}

        {/* Action Button */}
        <div className="text-center">
          <Button
            onClick={validateSentence}
            disabled={sentenceWords.filter(w => w).length === 0 || showFeedback}
            className="px-8 py-3 bg-reading-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl"
            size="lg"
          >
            Check My Sentence
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-lightBlue/20 via-lightBlue/5 to-white">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <PracticeHeader
          title="Sentence Building"
          subtitle="Construct sentences with phonics and sight words"
          iconName="Edit3"
          iconColorClass="reading-primary"
          difficulties={difficulties}
          currentDifficulty={difficulty}
          onSelectDifficulty={setDifficulty}
          sessionStats={progress}
        />

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            <div className="flex flex-wrap gap-2">
              {exerciseTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={exerciseType === type.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setExerciseType(type.id)}
                  className="flex items-center space-x-2"
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={generateExercise}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <RotateCcw size={16} />
              <span>New Exercise</span>
            </Button>
          </div>
        </div>

        {/* Progress Display */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Text size="sm" className="text-surface-500 mb-1">Accuracy</Text>
              <Text size="xl" className="font-bold text-reading-primary">
                {progress.total > 0 ? Math.round((progress.correct / progress.total) * 100) : 0}%
              </Text>
            </div>
            <div className="text-center">
              <Text size="sm" className="text-surface-500 mb-1">Sentences</Text>
              <Text size="xl" className="font-bold text-surface-700">
                {progress.correct}/{progress.total}
              </Text>
            </div>
            <div className="text-center">
              <Text size="sm" className="text-surface-500 mb-1">Streak</Text>
              <div className="flex items-center justify-center space-x-1">
                <Star className="text-yellow-500" size={16} />
                <Text size="xl" className="font-bold text-yellow-600">
                  {progress.streak}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Area */}
        <div className="mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${exerciseType}-${currentExercise?.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderExerciseContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feedback Modal */}
        <AnimatePresence>
          {showFeedback && validationResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
                <div className="mb-4">
                  {validationResult.isValid ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  )}
                </div>
                
                <Text size="lg" weight="bold" className="mb-2">
                  {validationResult.feedback}
                </Text>
                
                {validationResult.score !== undefined && (
                  <Text className="text-surface-600 mb-4">
                    Score: {validationResult.score}%
                  </Text>
                )}
                
                {validationResult.suggestions && validationResult.suggestions.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <Text size="sm" weight="semibold" className="text-surface-700">
                      Suggestions:
                    </Text>
                    {validationResult.suggestions.map((suggestion, index) => (
                      <Text key={index} size="sm" className="text-surface-600">
                        • {suggestion}
                      </Text>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SentenceBuildingPage;