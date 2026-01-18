'use client';

import React from 'react';

type Props = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  isSelect?: boolean;
  isAdd?: boolean;
  options?: string[];
};

export const FilterInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  isSelect,
  isAdd,
  options,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] text-gray-500">{label}</label>

      {isSelect ? (
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="h-11 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A669]"
        >
           <option value="">{placeholder || 'Выберите'}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full h-11 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A669]"
          />

          {isAdd && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2  text-xl"
            >
              +
            </button>
          )}
        </div>
      )}
    </div>
  );
};
