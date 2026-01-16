import { FC } from 'react'

import Link from 'next/link';
const Footer: FC = () => {
    return (
        <footer className="w-full bg-linear-to-r from-[#221b43] to-[#201e29] text-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

                    <div>
                        <h2 className="text-white text-[48px] tracking-[0.3em] font-semibold">
                            NOVO
                        </h2>
                        <p className="text-sm text-[15px] mt-3 max-w-xs leading-relaxed">
                            Маркетплейс коммерческого транспорта
                            и тяжелой техники
                        </p>
                    </div>

                    <div className="flex gap-16">
                        <div>
                            <p className="text-xs uppercase tracking-widest mb-4">
                                Покупателю
                            </p>
                            <ul className="space-y-3 text-sm text-white">
                                <li>
                                    <a
                                        href="/support"
                                        className="hover:opacity-80 transition"
                                    >
                                        Служба поддержки
                                    </a>
                                </li>
                            </ul>

                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-widest mb-4 opacity-0">
                                .
                            </p>
                            <ul className="space-y-3 text-sm text-white">
                                <Link href="/SellerRegisterPage" className="cursor-pointer hover:opacity-80">
                                    Стать продавцем
                                </Link>
                            </ul>
                        </div>
                    </div>

                    <div className="md:text-right">
                        <p className="text-xs uppercase tracking-widest mb-4">
                            Следите за нами
                        </p>
                        <div className="flex md:justify-end gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
                            >
                                f
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
                            >
                                ◎
                            </a>

                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
                            >
                                ▶
                            </a>
                        </div>

                    </div>

                </div>

                <div className="mt-14 border border-gray-700 py-4 text-center text-sm">
                    © 2019–2020 Группа компаний «NOVO»
                </div>

            </div>
        </footer>



    )
}
export default Footer;
