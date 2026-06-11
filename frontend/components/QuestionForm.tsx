'use client';

import { Control, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';

import { CreateQuizForm } from '@/types/quiz';

interface QuestionFormProps {
  index: number;
  control: Control<CreateQuizForm>;
  register: UseFormRegister<CreateQuizForm>;
  errors: FieldErrors<CreateQuizForm>;
  onRemove: (index: number) => void;
}

export default function QuestionForm({
  index,
  control,
  register,
  errors,
  onRemove,
}: QuestionFormProps) {
  const type = useWatch({
    control,
    name: `questions.${index}.type`,
  });

  return (
    <div className="rounded border p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Question {index + 1}</h2>

        <button type="button" onClick={() => onRemove(index)} className="rounded border px-3 py-1">
          Remove
        </button>
      </div>

      <div>
        <input
          {...register(`questions.${index}.text`, {
            required: 'Question text is required',
          })}
          placeholder="Question text"
          className={`w-full rounded border p-2 ${
            errors.questions?.[index]?.text ? 'border-red-500' : ''
          }`}
        />

        {errors.questions?.[index]?.text && (
          <p className="mt-1 mb-4 text-sm text-red-500">{errors.questions[index]?.text?.message}</p>
        )}
      </div>

      <select
        {...register(`questions.${index}.type`)}
        className="mb-4 mt-4 w-full rounded border p-2"
      >
        <option value="boolean">Boolean</option>
        <option value="input">Input</option>
        <option value="checkbox">Checkbox</option>
      </select>

      {type === 'boolean' && (
        <div className="space-y-2 rounded bg-gray-50 p-3">
          <label className="block">
            <input type="radio" disabled className="mr-2" />
            True
          </label>

          <label className="block">
            <input type="radio" disabled className="mr-2" />
            False
          </label>
        </div>
      )}

      {type === 'input' && (
        <input
          disabled
          placeholder="Short text answer"
          className="w-full rounded border bg-gray-50 p-2"
        />
      )}

      {type === 'checkbox' && (
        <div className="space-y-2">
          <input
            {...register(`questions.${index}.options.0`)}
            placeholder="Option 1"
            className="w-full rounded border p-2"
          />

          <input
            {...register(`questions.${index}.options.1`)}
            placeholder="Option 2"
            className="w-full rounded border p-2"
          />

          <input
            {...register(`questions.${index}.options.2`)}
            placeholder="Option 3"
            className="w-full rounded border p-2"
          />
        </div>
      )}
    </div>
  );
}
