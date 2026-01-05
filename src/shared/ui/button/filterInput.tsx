import React from 'react';

interface FilterInputProps {
  label: string;
  placeholder: string;
  isSelect?: boolean;
  isAdd?: boolean;
}

export const FilterInput: React.FC<FilterInputProps> = ({ label, placeholder, isSelect, isAdd }) => (
  <div className="flex flex-col mb-2">
    <label className="text-[10px] text-gray-400 mb-1 ml-1 truncate">{label}</label>
    <div className="flex items-center justify-between border border-gray-200 rounded-sm p-2.5 bg-white cursor-pointer h-[44px]">
      <span className="text-xs text-gray-800 font-medium truncate">{placeholder}</span>
      {isSelect && (
        <svg className="w-2.5 h-2.5 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      )}
      {isAdd && <span className="text-lg text-gray-300 font-light">+</span>}
    </div>
  </div>
);