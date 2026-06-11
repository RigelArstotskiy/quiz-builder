import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const createQuiz = async (req: Request, res: Response): Promise<void> => {
  const { title, questions } = req.body;

  if (!title || !Array.isArray(questions) || questions.length === 0) {
    res.status(400).json({ error: 'Title and at least one question are required' });
    return;
  }

  const quiz = await prisma.quiz.create({
    data: {
      title,
      questions: {
        create: questions.map((q: { type: string; text: string; options?: string[] }) => ({
          type: q.type,
          text: q.text,
          options: q.options ? JSON.stringify(q.options) : null,
        })),
      },
    },
    include: { questions: true },
  });

  res.status(201).json(quiz);
};

export const getQuizzes = async (_req: Request, res: Response): Promise<void> => {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { questions: true } },
    },
  });

  res.json(quizzes);
};

export const getQuizById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(id) },
    include: { questions: true },
  });

  if (!quiz) {
    res.status(404).json({ error: 'Quiz not found' });
    return;
  }

  res.json(quiz);
};

export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const existing = await prisma.quiz.findUnique({ where: { id: Number(id) } });

  if (!existing) {
    res.status(404).json({ error: 'Quiz not found' });
    return;
  }

  await prisma.quiz.delete({ where: { id: Number(id) } });

  res.status(204).send();
};
