import { Leasing } from "@/widgets/Leasing";
import { Company } from "@/widgets/Company";
import Link from "next/link";

export default function SellersPage() {
  return (
    <div className="max-w-7xl mx-auto px-2 min-h-screen">
      {/* Breadcrumbs */}
      <nav className="text-[14px] text-[#8B959E] py-4">
        <Link href="/" className="hover:text-green-500">Главная</Link>
        <span className="mx-2">{'>'}</span>
        <span className="text-[#252525]">Продавцы</span>
        <span className="mx-2">{'>'}</span>
        <span className="text-[#252525]">Лизинг</span>
      </nav>

      {/* Заголовок и кнопки */}
      <div className="pb-4">
        <h2 className="text-3xl font-bold text-[#252525] py-4">
          Продавец OTP Leasing
        </h2>
        <div className="text-[14px] flex gap-4">
          <Link
            href="/messages"
            className="bg-[#009661] text-white px-4 py-2 rounded hover:opacity-90 transition"
          >
            написать продавцу
          </Link>
          <Link
            href="#company"
            className="text-[#009661] hover:underline self-center"
          >
            Про компанию
          </Link>
        </div>
      </div>

      {/* Основной контент */}
      <div className="px-2 py-4 lg:py-8">
        <Leasing />
      </div>

      {/* Секция о компании */}
      <div id="company" className="mt-8">
        <Company />
      </div>
    </div>
  );
}