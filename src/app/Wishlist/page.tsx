  import { Favorites } from "@/widgets/Favorites";
  import Link from "next/link"; 
  import { ProfileTabs } from "@/shared/components/ProfileTabs";  

  const FavoritesPage = () => {
    return (
      <div className="px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-black transition">
            Главная
          </Link>
          <span>/</span>
          <Link href="/profile" className="hover:text-black transition">
            Мой кабинет
          </Link>
          <span>/</span>
          <span className="text-black font-medium">Избранное</span>
        </nav>

        <h2 className="text-[#252525] text-4xl font-bold mb-4">Избранное</h2>

        <ProfileTabs />

        <Favorites />
      </div>
    );
  };

  export default FavoritesPage;