import { useRef, useState } from 'react';

export const useItemMediaUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const pickImage = (index: number) => {
    setActiveIndex(index);
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeIndex === null) return;

    setImages(prev => {
      const copy = [...prev];
      copy[activeIndex] = file;
      return copy;
    });

    e.target.value = '';
  };

  return {
    images,
    fileInputRef,
    pickImage,
    onFileChange,
  };
};
