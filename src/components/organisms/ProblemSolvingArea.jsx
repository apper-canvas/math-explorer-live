import React from 'react';
import { motion } from 'framer-motion';
import ProblemStatement from '@/components/molecules/ProblemStatement';
import AnswerInput from '@/components/atoms/AnswerInput';
import FeedbackMessage from '@/components/molecules/FeedbackMessage';
import Button from '@/components/atoms/Button';
import NumberPad from '@/components/molecules/NumberPad';

const ProblemSolvingArea = ({
  currentProblem,
  userAnswer,
  setUserAnswer,
  handleKeyPress,
  checkAnswer,
  showFeedback,
  isCorrect,
  handleNumberPadInput,
  operatorColorClass = 'primary'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-8">
        <div className="text-center">
          <ProblemStatement
            operand1={currentProblem?.operand1}
            operand2={currentProblem?.operand2}
            operator={currentProblem?.operator}
            problemId={currentProblem?.id}
          />

          <div className="mb-6">
            <AnswerInput
              value={userAnswer}
              onChange={setUserAnswer}
              onKeyPress={handleKeyPress}
              disabled={showFeedback}
              isCorrect={isCorrect}
              showFeedback={showFeedback}
              className={`focus:border-${operatorColorClass}`}
            />
          </div>

          <FeedbackMessage
            show={showFeedback}
            isCorrect={isCorrect}
            message={isCorrect ? "Perfect!" : `Correct answer: ${currentProblem?.answer}`}
          />

          {!showFeedback && (
            <Button
              onClick={checkAnswer}
              disabled={!userAnswer}
              className={`px-8 py-3 bg-${operatorColorClass} text-white rounded-xl font-medium shadow-lg hover:shadow-xl`}
            >
              Check Answer
            </Button>
          )}
        </div>
      </div>

      <NumberPad onInput={handleNumberPadInput} disabled={showFeedback} />
    </motion.div>
  );
};

export default ProblemSolvingArea;