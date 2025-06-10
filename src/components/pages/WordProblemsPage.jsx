import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { wordProblemService } from '@/services';
import Loader from '@/components/atoms/Loader';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import AnswerInput from '@/components/atoms/AnswerInput';
import WordProblemDisplay from '@/components/molecules/WordProblemDisplay';
import WordProblemParameters from '@/components/molecules/WordProblemParameters';
import WordProblemVisualAid from '@/components/molecules/WordProblemVisualAid';
import FeedbackMessage from '@/components/molecules/FeedbackMessage';
import StatCard from '@/components/molecules/StatCard';
import { motion, AnimatePresence } from 'framer-motion';

function WordProblemsPage() {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    streak: 0
  });
  const [parameters, setParameters] = useState({
    operation: 'addition',
    difficulty: 'easy',
    context: 'shopping',
    minNumber: 1,
    maxNumber: 10
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showVisualAid, setShowVisualAid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showParameters, setShowParameters] = useState(true);

  const operationConfig = {
    addition: { icon: 'Plus', color: 'success', label: 'Addition' },
    subtraction: { icon: 'Minus', color: 'warning', label: 'Subtraction' },
    multiplication: { icon: 'X', color: 'accent', label: 'Multiplication' },
    division: { icon: 'Divide', color: 'secondary', label: 'Division' }
  };

  const currentConfig = operationConfig[parameters.operation];

  useEffect(() => {
    if (currentProblem === null) {
      generateNewProblem();
    }
  }, [parameters]);

  const generateNewProblem = async () => {
    setLoading(true);
    try {
      const problem = await wordProblemService.generateProblem(parameters);
      setCurrentProblem(problem);
      setUserAnswer('');
      setShowFeedback(false);
      setShowParameters(false);
    } catch (error) {
      toast.error('Failed to generate word problem');
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = () => {
    if (!userAnswer || !currentProblem) return;

    const answer = parseFloat(userAnswer);
    const correct = Math.abs(answer - currentProblem.answer) < 0.01;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setSessionStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
      streak: correct ? prev.streak + 1 : 0
    }));

    if (correct) {
      toast.success('Excellent! That\'s the right answer!');
    } else {
      toast.error(`Not quite! The answer is ${currentProblem.answer}`);
    }
  };

  const handleNextProblem = () => {
    generateNewProblem();
  };

  const handleNewParameters = () => {
    setShowParameters(true);
    setCurrentProblem(null);
    setShowFeedback(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer && !showFeedback) {
      checkAnswer();
    }
  };

  if (loading) {
    return (
      <Loader 
        iconName={currentConfig.icon}
        message="Generating word problem..." 
        iconColorClass={currentConfig.color}
        bgColorFrom={`${currentConfig.color}/5`}
        bgColorVia="white" 
        bgColorTo={`${currentConfig.color}/10`}
      />
    );
  }

  return (
    <div className={`min-h-full bg-gradient-to-br from-${currentConfig.color}/5 via-white to-${currentConfig.color}/10`}>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-${currentConfig.color}/10 text-${currentConfig.color} rounded-2xl mb-4`}>
            <i className={`fas fa-${currentConfig.icon === 'BookOpen' ? 'book-open' : 'calculator'} text-2xl`}></i>
          </div>
          <Text type="h1" className="text-4xl font-display text-surface-800 mb-2">
            Word Problem Generator
          </Text>
          <Text type="p" className="text-lg text-surface-600">
            Solve real-world {currentConfig.label.toLowerCase()} problems with visual aids
          </Text>
        </div>

        {/* Session Stats */}
        {sessionStats.total > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard
              icon="Target"
              label="Accuracy"
              value={`${Math.round((sessionStats.correct / sessionStats.total) * 100)}%`}
              bgColor="success/10"
              textColor="success"
            />
            <StatCard
              icon="Zap"
              label="Streak"
              value={sessionStats.streak}
              bgColor="warning/10"
              textColor="warning"
            />
            <StatCard
              icon="CheckCircle"
              label="Solved"
              value={`${sessionStats.correct}/${sessionStats.total}`}
              bgColor="primary/10"
              textColor="primary"
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {showParameters ? (
            <motion.div
              key="parameters"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WordProblemParameters
                parameters={parameters}
                setParameters={setParameters}
                onGenerate={generateNewProblem}
                currentConfig={currentConfig}
              />
            </motion.div>
          ) : currentProblem ? (
            <motion.div
              key="problem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Problem Section */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm border border-surface-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Text type="h3" className="text-xl font-heading text-surface-800">
                      Word Problem
                    </Text>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNewParameters}
                      className="text-surface-600"
                    >
                      Change Settings
                    </Button>
                  </div>
                  
                  <WordProblemDisplay problem={currentProblem} />
                  
                  <div className="mt-6 space-y-4">
                    <AnswerInput
                      value={userAnswer}
                      onChange={setUserAnswer}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your answer..."
                      disabled={showFeedback}
                      className="w-full"
                    />
                    
                    {!showFeedback ? (
                      <Button
                        onClick={checkAnswer}
                        disabled={!userAnswer}
                        className={`w-full bg-${currentConfig.color} hover:bg-${currentConfig.color}/90`}
                      >
                        Check Answer
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <FeedbackMessage
                          isCorrect={isCorrect}
                          correctAnswer={currentProblem.answer}
                          explanation={currentProblem.explanation}
                        />
                        <Button
                          onClick={handleNextProblem}
                          className={`w-full bg-${currentConfig.color} hover:bg-${currentConfig.color}/90`}
                        >
                          Next Problem
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Visual Aid Section */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm border border-surface-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Text type="h3" className="text-xl font-heading text-surface-800">
                      Visual Aid
                    </Text>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowVisualAid(!showVisualAid)}
                      className={`text-${currentConfig.color}`}
                    >
                      {showVisualAid ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {showVisualAid && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <WordProblemVisualAid
                          problem={currentProblem}
                          showAnswer={showFeedback && isCorrect}
                          colorClass={currentConfig.color}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default WordProblemsPage;