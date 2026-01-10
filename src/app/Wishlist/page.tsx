import { Favorites } from "@/widgets/Favorites";
import Link from "next/link";

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

      <nav className="flex gap-6 border-b border-gray-200 mb-6">
        <Link
          href="/Wishlist"
          className="pb-3 text-sm font-medium text-black border-b-2 border-black"
        >
          Избранное
        </Link>
        <Link
          href="/messages"
          className="pb-3 text-sm text-gray-500 hover:text-black transition flex items-center gap-1"
        >
          Сообщения
          <span className="text-green-600">()</span>
        </Link>
        <Link
          href="/settings"
          className="pb-3 text-sm text-gray-500 hover:text-black transition"
        >
          Настройки профиля
        </Link>
      </nav>

      <Favorites />
    </div>
  );
};

export default FavoritesPage;