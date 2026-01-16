import { Filter } from '@/widgets/Filter';
import { Features } from '@/widgets/features';
import { TopAdsSection } from '@/widgets/TopAdsSection';
import RecentlyViewed from '@/shared/components/RecentlyViewed/page'; 
import OurSellers from '@/shared/components/OurSellers/OurSellers';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen"> 
      <Filter /> 
      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold my-6">Топ объявления</h2>
        
        <div className="flex flex-col lg:flex-row gap-6 px-2 py-4 lg:py-8">
          <TopAdsSection />
        </div>
        
        <div className="flex justify-center mt-6">
          <Link
            href="/searchResult"
            className="px-6 py-2 bg-[#009661] text-white rounded-lg shadow-lg hover:bg-[#007a4d] transition"
          >
            Показать все объявления
          </Link>
        </div>
      </section>

      <RecentlyViewed />
       <OurSellers/>
      <Features />  
    </main>
  );
}
