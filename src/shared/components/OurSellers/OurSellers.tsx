import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import ATS from '@/shared/assets/icons/ATS.svg'
import SCANIA from '@/shared/assets/icons/SCANIA.svg'

const sellers = [
    {
        id: 1,
        name: 'Продавец 1',
        image: ATS,
    },
    {
        id: 2,
        name: 'Продавец 2',
        image: ATS,
    },
    {
        id: 3,
        name: 'Продавец 3',
        image: SCANIA,
    },
    {
        id: 4,
        name: 'Продавец 4',
        image: SCANIA,
    },
]

const OurSellers: FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="max-w-xl">
                    <h2 className="text-[44px] font-semibold text-[#252525] mb-2">
                        Наши продавцы
                    </h2>

                    <p className="text-[20px] text-[#8A8A8A] leading-relaxed">
                        Мы работаем только с лучшими игроками на рынке.
                        <br />

                    </p>

                    <Link href="/SellersPage">
                        <button
                            className="
                px-5 py-3 mt-7
                border border-[#009661]
                text-[#FFFFFF]
                bg-[#009661]
                rounded-lg
                text-[17px] font-medium
             
              "
                        >
                            Показать всех
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6 p-10 border border-gray-300 rounded-3xl bg-white">
                    {sellers.map((seller) => (
                        <div
                            key={seller.id}
                            className="flex items-center justify-center  rounded-xl h-24 w-33.25 overflow-hidden transition hover:shadow-md"
                        >
                            <Image
                                src={seller.image}
                                alt={seller.name}
                                width={133}
                                height={88}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurSellers