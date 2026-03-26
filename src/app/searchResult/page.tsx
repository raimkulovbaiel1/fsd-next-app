import { SearchResult } from '@/widgets/SearchResult';
import Link from 'next/link';
import { Suspense } from 'react';

export default function SearchResultPage() {
  return (
    <div className="max-w-7xl mx-auto px-2 min-h-screen">
      <nav className="text-[14px] text-[#8B959E] py-4">
        <Link href="/" className="hover:text-green-500">
          Главная
        </Link>
        <span className="mx-2">{'>'}</span>
        <span className="text-[#252525]">Транспортные средства</span>
      </nav>
      <Suspense fallback={<div className="py-10 text-center">Загрузка...</div>}>
        <SearchResult />
      </Suspense>
    </div>
  );
}