'use client';

import React, { useRef, useState } from 'react';
import { ItemMediaUpload } from '@/features/item-media-upload/ui/ItemMediaUpload'

const SellerNewItemPage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<File[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePickImage = (index: number) => {
    setActiveIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeIndex === null) return;

    setImages(prev => {
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

  return (
    <div className="min-h-screen px-4 py-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-lg">
        <div className="border-b px-6 py-5">
          <h1 className="text-xl font-bold text-right">
            Создание нового объявления
          </h1>
        </div>

        <form className="divide-y">
           <div className="px-6 py-6 sm:px-8"> <h2 className="mb-5 text-lg font-semibold text-gray-800"> Обзор транспортного средства </h2> <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2"> {/* Категория */} <div> <label htmlFor="category" className="block text-sm font-medium text-gray-700" > Категория </label> <input type="text" id="category" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="Легковые автомобили" /> </div> {/* Год начиная с */} <div> <label htmlFor="yearFrom" className="block text-sm font-medium text-gray-700" > Год (начиная с) </label> <input type="number" id="yearFrom" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="2015" /> </div> {/* Марка */} <div> <label htmlFor="brand" className="block text-sm font-medium text-gray-700" > Марка </label> <input type="text" id="brand" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="Toyota" /> </div> {/* Пробег */} <div> <label htmlFor="mileage" className="block text-sm font-medium text-gray-700" > Пробег </label> <input type="text" id="mileage" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="120 000 км" /> </div> {/* Модель */} <div> <label htmlFor="model" className="block text-sm font-medium text-gray-700" > Модель </label> <input type="text" id="model" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="Camry XV70" /> </div> {/* Страна */} <div> <label htmlFor="country" className="block text-sm font-medium text-gray-700" > Страна </label> <input type="text" id="country" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="Япония" /> </div> {/* Цена */} <div> <label htmlFor="price" className="block text-sm font-medium text-gray-700" > Цена </label> <input type="text" id="price" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="1 850 000 ₸" /> </div> {/* Вес (если нужно) */} <div> <label htmlFor="weight" className="block text-sm font-medium text-gray-700" > Вес </label> <input type="text" id="weight" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="—" /> </div> </div> </div>
              <ItemMediaUpload />

          <div className="px-6 py-6">
            <h2 className="mb-4 text-lg font-semibold">Описание</h2>

            <div className="flex gap-3 border rounded-t-lg bg-gray-50 px-3 py-2">
              <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => exec('bold')} className="font-bold">B</button>
              <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => exec('italic')} className="italic">I</button>
              <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => exec('underline')} className="underline">U</button>
              <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => exec('justifyLeft')}>≡</button>
              <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => exec('justifyCenter')}>≣</button>
              <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => exec('justifyRight')}>≡</button>
            </div>

            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="min-h-[160px] w-full rounded-b-lg border border-t-0 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              data-placeholder="Опишите объявление..."
            />
          </div>

          <div className="flex justify-end px-6 py-4">
            <button
              type="submit"
              className="rounded-lg bg-teal-600 px-6 py-2 text-white hover:bg-teal-700"
            >
              Создать объявление
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default SellerNewItemPage;
