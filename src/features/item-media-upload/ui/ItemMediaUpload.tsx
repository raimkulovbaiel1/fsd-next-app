'use client';

import { useItemMediaUpload } from './useItemMediaUpload';

export const ItemMediaUpload = () => {
  const {
    images,
    fileInputRef,
    pickImage,
    onFileChange,
  } = useItemMediaUpload();

  return (
  <div className="px-6 py-3 sm:px-40">
  <h2 className="mb-5 text-lg font-semibold text-gray-800">
    Медиа файлы
  </h2>

  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={onFileChange}
  />

  <div
    className="
      grid
      grid-cols-2
      gap-3
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-3
    "
  >
    <div
      onClick={() => pickImage(0)}
      className="
        relative aspect-square cursor-pointer rounded-lg
        border-2 border-dashed border-teal-600 bg-teal-50
        max-w-35 lg:max-w-30
      "
    >
      {images[0] ? (
        <img
          src={URL.createObjectURL(images[0])}
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-2xl text-teal-700">
          +
        </div>
      )}
    </div>

    {Array.from({ length: 5 }).map((_, i) => {
      const index = i + 1;

      return (
        <div
          key={i}
          onClick={() => pickImage(index)}
          className="
            relative aspect-square cursor-pointer rounded-lg
            border-2 border-dashed border-gray-300 bg-gray-50
            max-w-35 lg:max-w-30
          "
        >
          {images[index] ? (
            <img
              src={URL.createObjectURL(images[index])}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-2xl text-gray-400">
              +
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>

  );
};
