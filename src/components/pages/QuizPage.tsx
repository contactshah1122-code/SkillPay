import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Quiz, QuizQuestion } from '../../types';

export const QuizPage: React.FC = () => {
  const { quizzes, recordQuizCompletion, currentUser } = useApp();

  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState<{
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  }[]>([]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setTimeLeft(quiz.timePerQuestionSeconds);
    setScore(0);
    setIsQuizFinished(false);
    setUserAnswersHistory([]);
  };

  const currentQuestion: QuizQuestion | undefined = activeQuiz?.questions[currentQuestionIndex];

  // Timer countdown
  useEffect(() => {
    if (!activeQuiz || isQuizFinished || isAnswerSubmitted) return;

    if (timeLeft <= 0) {
      handleTimeExpired();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, timeLeft, isAnswerSubmitted, isQuizFinished]);

  const handleTimeExpired = () => {
    if (!currentQuestion) return;
    setIsAnswerSubmitted(true);
    setUserAnswersHistory((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedIndex: -1, // timeout
        isCorrect: false,
      },
    ]);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswerIndex === null || !currentQuestion) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswersHistory((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedIndex: selectedAnswerIndex,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(activeQuiz.timePerQuestionSeconds);
    } else {
      // Finish quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!activeQuiz) return;
    setIsQuizFinished(true);

    // Calculate virtual points reward proportional to score
    const finalScore = score + (selectedAnswerIndex === currentQuestion?.correctAnswerIndex ? 1 : 0);
    const proportion = finalScore / activeQuiz.questions.length;
    const pointsAwarded = Math.round(activeQuiz.rewardPoints * proportion);

    recordQuizCompletion(
      activeQuiz.id,
      finalScore,
      activeQuiz.questions.length,
      pointsAwarded
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Sports IQ &amp; Trivia Arena</span>
          <span aria-hidden="true">&middot;</span>
          <span>Earn Non-Monetary Points</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Sports Quizzes &amp; Brain Challenges
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Test your depth in Pakistani cricket history, PSL records, national football achievements, Davis Cup tennis, and basketball tactics. Each completed quiz awards non-monetary skill tokens.
        </p>
      </div>

      {/* If a quiz is active and NOT finished: Gameplay Screen */}
      {activeQuiz && !isQuizFinished && currentQuestion && (
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Top Bar: Progress and Timer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase">
                {activeQuiz.sport} Quiz
              </span>
              <span aria-hidden="true">&middot;</span>
              <span className="text-xs text-slate-400 font-mono">
                Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
              </span>
            </div>

            {/* Timer Ring / Pill */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
              timeLeft <= 5
                ? 'bg-rose-950 text-rose-300 border border-rose-600/40 animate-pulse'
                : 'bg-slate-800 text-emerald-400 border border-slate-700'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* 4 Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswerIndex === idx;
              const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;

              let buttonStyle = 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  buttonStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
                } else {
                  buttonStyle = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                buttonStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between cursor-pointer ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Visible once submitted) */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1.5 animate-in fade-in duration-300">
              <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Knowledge Breakdown &amp; Explanation:</span>
              </div>
              <p className="leading-relaxed text-slate-300">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-400 font-mono">
              Current Score: <span className="text-emerald-400 font-bold">{score}</span> / {currentQuestionIndex}
            </div>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedAnswerIndex === null}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-xs transition cursor-pointer"
              >
                Confirm Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>{currentQuestionIndex + 1 === activeQuiz.questions.length ? 'View Final Results' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quiz Completion Result Screen */}
      {activeQuiz && isQuizFinished && (
        <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mb-2">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              Competition Concluded
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Quiz Completed!
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {activeQuiz.title}
            </p>
          </div>

          {/* Score breakdown metrics */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-mono">Final Score</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">
                {score} / {activeQuiz.questions.length}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-mono">Precision</div>
              <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                {Math.round((score / activeQuiz.questions.length) * 100)}%
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-mono">Points Awarded</div>
              <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
                +{Math.round((score / activeQuiz.questions.length) * activeQuiz.rewardPoints)} PTS
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
            Points have been deposited into your non-monetary virtual balance. Review explanations or challenge other disciplines below!
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startQuiz(activeQuiz)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry This Quiz</span>
            </button>
            <button
              onClick={() => setActiveQuiz(null)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-950"
            >
              <span>Explore More Quizzes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Catalog of Quizzes (Shown when no quiz is currently active) */}
      {!activeQuiz && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-emerald-500/40 transition shadow-xl flex flex-col justify-between"
            >
              {quiz.image && (
                <div className="h-40 relative bg-slate-800 overflow-hidden">
                  <img
                    src={quiz.image}
                    alt={quiz.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 text-xs uppercase font-mono font-bold bg-slate-950/80 text-emerald-400 px-2.5 py-1 rounded-lg border border-slate-800">
                    {quiz.sport}
                  </span>
                </div>
              )}

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono text-emerald-400 uppercase font-semibold">
                      Difficulty: {quiz.difficulty}
                    </span>
                    <span className="text-amber-400 font-mono font-bold">
                      +{quiz.rewardPoints} PTS
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {quiz.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>{quiz.questions.length} Questions</span>
                    </div>
                    <span aria-hidden="true">&middot;</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{quiz.timePerQuestionSeconds}s / question</span>
                    </div>
                    <span aria-hidden="true">&middot;</span>
                    <span>{quiz.playsCount.toLocaleString()} Plays</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Pure sports skill &middot; 0 cash risk
                  </span>
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition active:scale-95 shadow-md shadow-emerald-950 cursor-pointer"
                  >
                    <span>Play Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
