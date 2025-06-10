import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RotateCcw, CheckCircle, XCircle, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import DifficultySelector from '@/components/molecules/DifficultySelector';
import FeedbackMessage from '@/components/molecules/FeedbackMessage';
import PracticeHeader from '@/components/organisms/PracticeHeader';
import letterService from '@/services/api/letterService';

const LetterRecognitionPage = () => {
  const [difficulty, setDifficulty] = useState('Easy');
  const [currentExercise, setCurrentExercise] = useState(null);
  const [exerciseType, setExerciseType] = useState('identification');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ correct: 0, total: 0, streak: 0 });
  const [draggedLetter, setDraggedLetter] = useState(null);

  const exerciseTypes = [
    { id: 'identification', label: 'Letter ID', icon: '🔍' },
    { id: 'matching', label: 'Match Case', icon: '🔗' },
    { id: 'dragdrop', label: 'Drag & Drop', icon: '👆' },
    { id: 'audio', label: 'Listen & Pick', icon: '🔊' }
  ];

  const generateExercise = useCallback(async () => {
    setLoading(true);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setDraggedLetter(null);

    try {
      const exercise = await letterService.generateExercise(exerciseType, difficulty);
      setCurrentExercise(exercise);
    } catch (error) {
      console.error('Error generating exercise:', error);
      toast.error('Failed to generate exercise');
    } finally {
      setLoading(false);
    }
  }, [exerciseType, difficulty]);

  const speakLetter = useCallback((letter) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  }, []);

  const handleAnswer = useCallback(async (answer) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    const correct = answer === currentExercise.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Update progress
    const newProgress = {
      correct: progress.correct + (correct ? 1 : 0),
      total: progress.total + 1,
      streak: correct ? progress.streak + 1 : 0
    };
    setProgress(newProgress);

    // Save progress
    try {
      await letterService.updateProgress(exerciseType, difficulty, correct);
    } catch (error) {
      console.error('Error updating progress:', error);
    }

    // Show feedback
    if (correct) {
      toast.success('Correct! Well done!');
      speakLetter(currentExercise.targetLetter);
    } else {
      toast.error(`Incorrect. The answer is ${currentExercise.correctAnswer}`);
    }

    // Auto-generate next exercise after feedback
    setTimeout(() => {
      generateExercise();
    }, 2000);
  }, [currentExercise, showFeedback, progress, generateExercise, speakLetter, exerciseType, difficulty]);

  const handleDragStart = (letter) => {
    setDraggedLetter(letter);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetLetter) => {
    e.preventDefault();
    if (draggedLetter) {
      handleAnswer(draggedLetter === targetLetter ? draggedLetter : null);
    }
  };

  useEffect(() => {
    generateExercise();
  }, [generateExercise]);

  const renderExerciseContent = () => {
    if (!currentExercise || loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-reading-primary"></div>
        </div>
      );
    }

    switch (exerciseType) {
      case 'identification':
        return (
          <div className="text-center space-y-8">
            <motion.div 
              className="text-8xl font-bold text-reading-primary bg-white rounded-2xl shadow-lg p-8 inline-block"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {currentExercise.targetLetter}
            </motion.div>
            
            <Text size="lg" className="text-surface-700">
              Click on the same letter:
            </Text>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              {currentExercise.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`letter-card p-6 text-4xl font-bold rounded-xl border-2 transition-all ${
                    selectedAnswer === option
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-white border-surface-200 hover:border-reading-primary text-surface-700'
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={`Letter ${option}`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'matching':
        return (
          <div className="text-center space-y-8">
            <Text size="lg" className="text-surface-700">
              Match the uppercase letter with its lowercase:
            </Text>
            
            <div className="flex justify-center items-center space-x-8">
              <motion.div 
                className="text-6xl font-bold text-reading-primary bg-white rounded-2xl shadow-lg p-6"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                {currentExercise.targetLetter}
              </motion.div>
              
              <Text size="xl" className="text-surface-500">↔</Text>
              
              <Text size="xl" className="text-surface-700 font-semibold">?</Text>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              {currentExercise.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`letter-card p-6 text-4xl font-bold rounded-xl border-2 transition-all ${
                    selectedAnswer === option
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-white border-surface-200 hover:border-reading-primary text-surface-700'
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={`Letter ${option}`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'dragdrop':
        return (
          <div className="text-center space-y-8">
            <Text size="lg" className="text-surface-700">
              Drag the letter to the correct box:
            </Text>
            
            <div className="flex justify-center space-x-8 mb-8">
              {currentExercise.draggableLetters.map((letter, index) => (
                <motion.div
                  key={index}
                  className="letter-card p-4 text-3xl font-bold bg-white rounded-xl shadow-lg cursor-move border-2 border-surface-200 hover:border-reading-primary"
                  draggable
                  onDragStart={() => handleDragStart(letter)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={`Draggable letter ${letter}`}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-lg mx-auto">
              {currentExercise.dropZones.map((zone, index) => (
                <motion.div
                  key={index}
                  className="drop-zone h-24 border-2 border-dashed border-surface-300 rounded-xl flex items-center justify-center text-surface-500 transition-all hover:border-reading-primary hover:bg-reading-light"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, zone.correctLetter)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={`Drop zone for ${zone.label}`}
                >
                  <Text size="sm" className="font-medium">{zone.label}</Text>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'audio':
        return (
          <div className="text-center space-y-8">
            <Text size="lg" className="text-surface-700">
              Listen to the letter and click on it:
            </Text>
            
            <motion.button
              className="p-8 bg-reading-primary text-white rounded-full shadow-lg hover:bg-reading-dark transition-all duration-300 mx-auto block"
              onClick={() => speakLetter(currentExercise.targetLetter)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              aria-label="Play letter sound"
            >
              <Volume2 size={48} />
            </motion.button>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              {currentExercise.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`letter-card p-6 text-4xl font-bold rounded-xl border-2 transition-all ${
                    selectedAnswer === option
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-white border-surface-200 hover:border-reading-primary text-surface-700'
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={`Letter ${option}`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PracticeHeader
        title="Letter Recognition"
        subtitle="Master uppercase and lowercase letters"
        icon="Type"
      />

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          <DifficultySelector
            value={difficulty}
            onChange={setDifficulty}
            options={[
              { value: 'Easy', label: 'Easy (A-M)', color: 'bg-green-500' },
              { value: 'Medium', label: 'Medium (N-Z)', color: 'bg-yellow-500' },
              { value: 'Hard', label: 'Hard (Mixed)', color: 'bg-red-500' }
            ]}
          />

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
            <Text size="sm" className="text-surface-500 mb-1">Questions</Text>
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
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6 min-h-[400px]">
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

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
              <FeedbackMessage
                isCorrect={isCorrect}
                message={isCorrect ? "Great job! 🎉" : "Try again! 💪"}
                icon={isCorrect ? CheckCircle : XCircle}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LetterRecognitionPage;