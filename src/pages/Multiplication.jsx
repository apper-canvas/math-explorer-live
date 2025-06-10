import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import MultiplicationGrid from '../components/MultiplicationGrid';
import VisualAid from '../components/VisualAid';
import NumberPad from '../components/NumberPad';
import { problemService } from '../services';

function Multiplication() {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    streak: 0
  });
  const [difficulty, setDifficulty] = useState('easy');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showVisualAid, setShowVisualAid] = useState(true);
  const [loading, setLoading] = useState(false);

  const difficulties = {
    easy: { label: 'Easy (1-5)', range: [1, 5], color: 'success' },
    medium: { label: 'Medium (1-10)', range: [1, 10], color: 'warning' },
    hard: { label: 'Hard (1-12)', range: [1, 12], color: 'error' }
  };

  useEffect(() => {
    generateNewProblem();
  }, [difficulty]);

  const generateNewProblem = async () => {
    setLoading(true);
    try {
      const range = difficulties[difficulty].range;
      const problem = await problemService.generateMultiplication(range[0], range[1]);
      setCurrentProblem(problem);
      setUserAnswer('');
      setShowFeedback(false);
    } catch (error) {
      toast.error('Failed to generate problem');
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = () => {
    if (!userAnswer || !currentProblem) return;

    const answer = parseInt(userAnswer);
    const correct = answer === currentProblem.answer;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setSessionStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
      streak: correct ? prev.streak + 1 : 0
    }));

    if (correct) {
      toast.success('Correct! Well done!');
    } else {
      toast.error(`Not quite! The answer is ${currentProblem.answer}`);
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      generateNewProblem();
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer && !showFeedback) {
      checkAnswer();
    }
  };

  const handleNumberPadInput = (value) => {
    if (value === 'clear') {
      setUserAnswer('');
    } else if (value === 'backspace') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else if (value === 'enter') {
      checkAnswer();
    } else {
      setUserAnswer(prev => prev + value);
    }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-accent/5 via-white to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 animate-bounce">
            <ApperIcon name="X" className="w-8 h-8 text-white" />
          </div>
          <p className="text-surface-600">Generating problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-accent/5 via-white to-accent/10">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center">
                  <ApperIcon name="X" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-display text-surface-800">Multiplication Practice</h1>
                  <p className="text-surface-600">Master your times tables</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                {/* Difficulty Selector */}
                <div className="flex space-x-2">
                  {Object.entries(difficulties).map(([key, diff]) => (
                    <button
                      key={key}
                      onClick={() => setDifficulty(key)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        difficulty === key
                          ? `bg-${diff.color} text-white shadow-md`
                          : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>

                {/* Session Stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-display text-lg text-accent">{sessionStats.correct}</div>
                    <div className="text-surface-500">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-lg text-surface-600">{sessionStats.total}</div>
                    <div className="text-surface-500">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-lg text-warning">{sessionStats.streak}</div>
                    <div className="text-surface-500">Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problem Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Problem Display */}
            <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-8">
              <div className="text-center">
                <AnimatePresence mode="wait">
                  {currentProblem && (
                    <motion.div
                      key={currentProblem.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-6xl font-display text-surface-800 mb-4">
                        {currentProblem.operand1} × {currentProblem.operand2}
                      </div>
                      <div className="text-4xl font-display text-surface-400 mb-6">=</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Answer Input */}
                <div className="mb-6">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value.replace(/[^0-9]/g, ''))}
                    onKeyPress={handleKeyPress}
                    placeholder="?"
                    disabled={showFeedback}
                    className={`w-32 h-16 text-4xl font-display text-center border-2 rounded-xl transition-all ${
                      showFeedback
                        ? isCorrect
                          ? 'border-success bg-success/10 text-success'
                          : 'border-error bg-error/10 text-error'
                        : 'border-surface-300 focus:border-accent focus:outline-none'
                    }`}
                  />
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        isCorrect
                          ? 'bg-success/10 text-success'
                          : 'bg-error/10 text-error'
                      }`}
                    >
                      <ApperIcon 
                        name={isCorrect ? "CheckCircle" : "XCircle"} 
                        className="w-5 h-5" 
                      />
                      <span className="font-medium">
                        {isCorrect ? "Correct!" : `Correct answer: ${currentProblem?.answer}`}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Check Button */}
                {!showFeedback && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={checkAnswer}
                    disabled={!userAnswer}
                    className="px-8 py-3 bg-accent text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Answer
                  </motion.button>
                )}
              </div>
            </div>

            {/* Number Pad */}
            <NumberPad onInput={handleNumberPadInput} disabled={showFeedback} />
          </motion.div>

          {/* Visual Aid Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Visual Aid Toggle */}
            <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-surface-800">Visual Aids</h3>
                <button
                  onClick={() => setShowVisualAid(!showVisualAid)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all ${
                    showVisualAid
                      ? 'bg-accent text-white'
                      : 'bg-surface-100 text-surface-600'
                  }`}
                >
                  <ApperIcon name={showVisualAid ? "Eye" : "EyeOff"} size={16} />
                  <span className="text-sm">{showVisualAid ? 'Hide' : 'Show'}</span>
                </button>
              </div>
            </div>

            {/* Visual Aid Display */}
            {showVisualAid && currentProblem && (
              <VisualAid 
                type="multiplication"
                operand1={currentProblem.operand1}
                operand2={currentProblem.operand2}
                answer={currentProblem.answer}
                showAnswer={showFeedback && isCorrect}
              />
            )}

            {/* Multiplication Grid */}
            <MultiplicationGrid 
              highlight={currentProblem ? [currentProblem.operand1, currentProblem.operand2] : null}
              maxSize={difficulties[difficulty].range[1]}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Multiplication;