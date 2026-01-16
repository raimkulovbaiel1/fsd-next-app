import { FC } from 'react'

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
                        Безопасность сделки обеспечена
                    </p>
                    <button
                        className="
                       px-6 py-3 mt-7
                       border border-[#009661]
                       text-[#009661]
                         rounded-lg
                       text-[14px] font-medium
                       hover:bg-[#009661]
                       hover:text-white
                     transition
                     "
                    >
                        Показать всех
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6 p-10 border border-gray-300 rounded-3xl bg-white">
                    <div className="flex items-center justify-center bg-gray-50 rounded-xl h-24 transition hover:shadow-md">
                        <img
                            src="https://opis-cdn.tinkoffjournal.ru/b-secrets/2023_04_9U7vAlfc-1_png.png"
                            alt="Продавец 1"
                            className="max-h-22 object-contain"
                        />
                    </div>

                    <div className="flex items-center justify-center bg-gray-50 rounded-xl h-24 transition hover:shadow-md">
                        <img
                            src="https://opis-cdn.tinkoffjournal.ru/b-secrets/2023_04_9U7vAlfc-1_png.png"
                            alt="Продавец 2"
                            className="max-h-22 object-contain"
                        />
                    </div>

                    <div className="flex items-center justify-center bg-gray-50 rounded-xl h-24 transition hover:shadow-md">
                        <img
                            src="https://opis-cdn.tinkoffjournal.ru/b-secrets/2023_04_9U7vAlfc-1_png.png"
                            alt="Продавец 3"
                            className="max-h-22 object-contain"
                        />
                    </div>

                    <div className="flex items-center justify-center bg-gray-50 rounded-xl h-24 transition hover:shadow-md">
                        <img
                            src="https://opis-cdn.tinkoffjournal.ru/b-secrets/2023_04_9U7vAlfc-1_png.png"
                            alt="Продавец 4"
                            className="max-h-22 object-contain"
                        />
                    </div>
                </div>



            </div>
        </section>


    )
}

export default OurSellers;