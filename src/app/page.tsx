import { Filter } from '@/widgets/Filter';
import { Features } from '@/widgets/features'; 
import { TopAdsSection } from '@/widgets/TopAdsSection';
export default function Home() {
  return (
    <main className="min-h-screen"> 
   
      <Filter /> 
      <TopAdsSection/>
      <Features />  
     
    </main>
  );
}
