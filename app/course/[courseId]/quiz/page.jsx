'use client'

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import StepProgress from '../_components/StepProgress';
import QuizCardItem from './_components/QuizCardItem';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


function Quiz() {
  const router=useRouter();
  const { courseId } = useParams();
  const [quizData, setQuizData] = useState();
  const [quiz, setQuiz] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAns, setIsCorrectAnswer] = useState(null);
  const [correctAns, setCorrectAns] = useState();
  const [score, setScore] = useState(0); // Track the user's score
  const [isOptionSelected, setIsOptionSelected] = useState(false); // Track if an option is selected

  useEffect(() => {
    GetQuiz();
  }, []);

  const GetQuiz = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'Quiz',
    });

    setQuizData(result.data);
    setQuiz(result.data?.content?.questions || []);
  };

  const checkAnswer = (userAnswer, currentQuestion) => {
    setCorrectAns(currentQuestion?.correctAnswer);

    if (userAnswer === currentQuestion?.correctAnswer) {
      setIsCorrectAnswer(true);
      setScore((prev) => prev + 1); // Increment score if correct
    } else {
      setIsCorrectAnswer(false);
    }
    setIsOptionSelected(true); // Mark the option as selected
  };

  const nextQuestion = () => {
    setStepCount((prev) => prev + 1);
    setCorrectAns(null);
    setIsCorrectAnswer(null);
    setIsOptionSelected(false); // Reset option selection for the next question
  };

  return (
    <div>
      <h2 className='font-bold text-2xl text-center mb-4'>Quiz</h2>

      {stepCount < quiz.length ? (
        <>
          <StepProgress data={quiz} stepCount={stepCount} setStepCount={nextQuestion} />

          <div>
            <QuizCardItem
              quiz={quiz[stepCount]}
              userSelectedOption={(v) => {
                if (!isOptionSelected) {
                  checkAnswer(v, quiz[stepCount]);
                }
              }}
            />
          </div>

          {isCorrectAns === false && (
            <div className='border p-3 border-red-700 bg-red-200'>
              <h2 className='font-bold text-lg text-red-600'>Incorrect</h2>
              <p className='text-red-600'>Correct Answer is: {correctAns}</p>
            </div>
          )}

          {isCorrectAns === true && (
            <div className='border p-3 border-green-700 bg-green-200'>
              <h2 className='font-bold text-lg text-green-600'>Correct</h2>
              <p className='text-green-600'>Your answer is correct</p>
            </div>
          )}

          <button
            className={`mt-4 px-4 py-2 font-bold text-white rounded ${
              isOptionSelected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'
            }`}
            disabled={!isOptionSelected}
            onClick={nextQuestion}
          >
            Next Question
          </button>
        </>
      ) : (
        <div className='text-center mt-8'>
          <h2 className='font-bold text-2xl'>Quiz Completed</h2>
          <p className='text-lg'>Your final score is: {score}/{quiz.length}</p>
          <Button onClick={()=>router.back()}>Go to course Page</Button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
