import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { problemService } from '@/services';
import Loader from '@/components/atoms/Loader';
import PracticeHeader from '@/components/organisms/PracticeHeader';
import ProblemSolvingArea from '@/components/organisms/ProblemSolvingArea';
import VisualAidSection from '@/components/organisms/VisualAidSection';

function MultiplicationPage() {
const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    streak: 0
  });
  const [difficulty, setDifficulty] = useState('easy');
  const [problemNumber, setProblemNumber] = useState(1);
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
    setProblemNumber(1); // Reset problem number when difficulty changes
    generateNewProblem();
  }, [difficulty]);

  const generateNewProblem = async () => {
    setLoading(true);
    try {
      console.log('Generating multiplication problem for difficulty:', difficulty);
      const range = difficulties[difficulty].range;
      console.log('Using range:', range);
      
      const problem = await problemService.generateMultiplication(range[0], range[1]);
      console.log('Generated problem:', problem);
      
      if (!problem || problem.operand1 === undefined || problem.operand2 === undefined) {
        throw new Error('Invalid problem generated');
      }
      
const problemWithOperator = { ...problem, operator: '×' };
      setCurrentProblem(problemWithOperator);
      console.log('Set current problem:', problemWithOperator);
      
      setUserAnswer('');
      setShowFeedback(false);
    } catch (error) {
      console.error('Error generating multiplication problem:', error);
      toast.error('Failed to generate problem. Please try again.');
      
      // Fallback problem to ensure page always has content
      const fallbackProblem = {
        id: `fallback_${Date.now()}`,
        operand1: 2,
        operand2: 3,
        answer: 6,
        operator: '×',
        type: 'multiplication'
      };
      setCurrentProblem(fallbackProblem);
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
      setProblemNumber(prev => prev + 1);
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
      <Loader 
        iconName="X" 
        message="Generating problem..." 
        iconColorClass="accent" 
        bgColorFrom="accent/5" 
        bgColorVia="white" 
        bgColorTo="accent/10" 
      />
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-accent/5 via-white to-accent/10">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <PracticeHeader
          title="Multiplication Practice"
          subtitle="Master your times tables"
          iconName="X"
          iconColorClass="accent"
          difficulties={difficulties}
          currentDifficulty={difficulty}
          onSelectDifficulty={setDifficulty}
          sessionStats={sessionStats}
        />

        <div className="grid lg:grid-cols-2 gap-6">
<ProblemSolvingArea
            currentProblem={currentProblem}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            handleKeyPress={handleKeyPress}
            checkAnswer={checkAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            handleNumberPadInput={handleNumberPadInput}
            operatorColorClass="accent"
            problemNumber={problemNumber}
          />

          <VisualAidSection
            type="multiplication"
            currentProblem={currentProblem}
            showVisualAid={showVisualAid}
            setShowVisualAid={setShowVisualAid}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            maxGridSize={difficulties[difficulty].range[1]}
            visualAidColorClass="accent"
          />
        </div>
      </div>
    </div>
  );
}

export default MultiplicationPage;