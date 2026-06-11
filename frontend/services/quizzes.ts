const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getQuizzes = async () => {
  const response = await fetch(`${API_URL}/quizzes`);

  if (!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }

  return response.json();
};

export const getQuizById = async (id: number) => {
  const response = await fetch(`${API_URL}/quizzes/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch quiz');
  }

  return response.json();
};

export const deleteQuiz = async (id: number) => {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete quiz');
  }
};

export const createQuiz = async (data: unknown) => {
  const response = await fetch(`${API_URL}/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create quiz');
  }

  return response.json();
};
