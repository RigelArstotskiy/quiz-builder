'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { createQuiz } from '@/services/quizzes';
import QuestionForm from '@/components/QuestionForm';
import { CreateQuizForm } from '@/types/quiz';

export default function CreateQuizPage() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateQuizForm>({
    defaultValues: {
      title: '',
      questions: [
        {
          text: '',
          type: 'boolean',
          options: [''],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: CreateQuizForm) => {
    const payload = {
      title: data.title,
      questions: data.questions.map((question) => ({
        type: question.type,
        text: question.text,
        options: question.type === 'checkbox' ? question.options?.filter(Boolean) : undefined,
      })),
    };

    await createQuiz(payload);

    router.push('/quizzes');
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Create Quiz</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            {...register('title', {
              required: 'Quiz title is required',
            })}
            placeholder="Quiz title"
            className={`w-full rounded border p-2 ${errors.title ? 'border-red-500' : ''}`}
          />

          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
        </div>

        {fields.map((field, index) => (
          <QuestionForm
            key={field.id}
            index={index}
            control={control}
            register={register}
            errors={errors}
            onRemove={remove}
          />
        ))}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() =>
              append({
                text: '',
                type: 'boolean',
                options: [''],
              })
            }
            className="rounded border px-4 py-2"
          >
            Add Question
          </button>

          <button
            type="submit"
            disabled={fields.length === 0}
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            Create Quiz
          </button>
        </div>

        {fields.length === 0 && (
          <p className="text-sm text-red-500">At least one question is required</p>
        )}
      </form>
    </main>
  );
}
