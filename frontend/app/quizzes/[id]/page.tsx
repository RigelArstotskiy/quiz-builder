'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { getQuizById } from '@/services/quizzes';
import { Quiz } from '@/types/quiz';

export default function QuizDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getQuizById(id);
        setQuiz(data);
      } finally {
        setLoading(false);
      }
    };

    if (!Number.isNaN(id)) {
      loadQuiz();
    }
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!quiz) {
    return <p className="p-6">Quiz not found</p>;
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-8 text-3xl font-bold">{quiz.title}</h1>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="rounded border p-4">
            <h2 className="mb-2 font-semibold">Question {index + 1}</h2>

            <p className="mb-2">Type: {question.type}</p>

            <p>{question.text}</p>

            {question.type === 'checkbox' && question.options && (
              <ul className="mt-3 list-disc pl-5">
                {JSON.parse(question.options).map((option: string) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
