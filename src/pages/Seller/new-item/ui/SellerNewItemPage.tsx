'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm, FieldErrors, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ItemMediaUpload } from '@/features/item-media-upload/ui/ItemMediaUpload';

import {
  SellerNewItemSchema,
  defaultValues,
  type SellerFormInput,
  type SellerFormValues,
} from '@/features/model/SellerNewItemPage';

type FieldName = keyof SellerFormInput;

interface FormFieldProps {
  name: FieldName;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<SellerFormInput>;
  errors: FieldErrors<SellerFormInput>;
}

interface FieldConfig {
  name: Exclude<FieldName, 'description'>;
  label: string;
  type?: string;
  placeholder?: string;
}

const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  register,
  errors,
}: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        {...register(name)}
        id={name}
        type={type}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500"
      />

      {errors[name]?.message && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

const SellerNewItemPage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<File[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [fields, setFields] = useState<FieldConfig[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SellerFormInput>({
    resolver: zodResolver(SellerNewItemSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch('http://localhost:5000/SellerNewitemPage');

        if (!res.ok) {
          throw new Error('Ошибка загрузки полей');
        }

        const data: FieldConfig[] = await res.json();
        setFields(data);
      } catch (error) {
        console.error('Ошибка загрузки полей:', error);
      }
    };

    fetchFields();
  }, []);

  const handlePickImage = (index: number) => {
    setActiveIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || activeIndex === null) return;

    setImages((prev) => {
      const copy = [...prev];
      copy[activeIndex] = file;
      return copy;
    });

    e.target.value = '';
  };

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const onSubmit = async (data: SellerFormInput) => {
    const parsed: SellerFormValues = SellerNewItemSchema.parse({
      ...data,
      description: editorRef.current?.innerHTML || '',
    });

    const newItem = {
      ...parsed,
      images: images.map((file) => file.name),
      createdAt: new Date().toISOString(),
    };

    console.log('Новое объявление:', newItem);

    reset();
    setImages([]);

    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-lg">
        <div className="border-b px-6 py-5">
          <h1 className="text-right text-xl font-bold">
            Создание нового объявления
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="divide-y">
          <div className="px-6 py-6 sm:px-8">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Обзор транспортного средства
            </h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  register={register}
                  errors={errors}
                />
              ))}
            </div>
          </div>

          <div className="px-6 py-6">
            <ItemMediaUpload />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              type="button"
              onClick={() => handlePickImage(0)}
              className="mt-4 rounded-lg border px-4 py-2 text-sm"
            >
              Выбрать изображение
            </button>

            {images.length > 0 && (
              <div className="mt-3 text-sm text-gray-600">
                {images.map((file, index) => (
                  <p key={`${file.name}-${index}`}>{file.name}</p>
                ))}
              </div>
            )}
          </div>

          <div className="px-6 py-6">
            <h2 className="mb-4 text-lg font-semibold">Описание</h2>

            <div className="flex gap-3 rounded-t-lg border bg-gray-50 px-3 py-2">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('bold')}
                className="font-bold"
              >
                B
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('italic')}
                className="italic"
              >
                I
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('underline')}
                className="underline"
              >
                U
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('justifyLeft')}
              >
                ≡
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('justifyCenter')}
              >
                ≣
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('justifyRight')}
              >
                ≡
              </button>
            </div>

            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="min-h-[160px] w-full rounded-b-lg border border-t-0 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              data-placeholder="Опишите объявление..."
              onInput={(e) =>
                setValue('description', e.currentTarget.innerHTML, {
                  shouldValidate: true,
                })
              }
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end px-6 py-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-teal-600 px-6 py-2 text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Сохранение...' : 'Создать объявление'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerNewItemPage;