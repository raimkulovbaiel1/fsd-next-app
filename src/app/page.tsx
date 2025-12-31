import { Filter } from '@/widgets/Filter';
import { Features } from '@/widgets/features'; 
import { Header } from '@/widgets/Header';

export default function Home() {
  return (
    <main className="min-h-screen"> 
    <Header/>
      <Filter />
      <Features />
    </main>
  );
}
