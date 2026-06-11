'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { getQuizzes, deleteQuiz } from '@/services/quizzes';
import { QuizListItem } from '@/types/quiz';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error('Failed to load quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this quiz?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteQuiz(id);

      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error('Failed to delete quiz:', error);

      alert('Failed to delete quiz');
    }
  };

  if (loading) {
    return (
      <main className="p-6">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Quizzes</h1>

      {quizzes.length === 0 ? (
        <p className="text-gray-500">No quizzes have been created yet.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="flex items-center justify-between rounded border p-4">
              <Link href={`/quizzes/${quiz.id}`} className="flex-1">
                <div>
                  <h2 className="font-semibold">{quiz.title}</h2>

                  <p className="text-sm text-gray-500">Questions: {quiz._count.questions}</p>
                </div>
              </Link>

              <button
                onClick={() => handleDelete(quiz.id)}
                className="rounded border px-3 py-1 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
