import React from "react";

const SellerSubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-[6px] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <section>
            <h2 className="mb-6 text-[24px] font-medium text-[#2b2b2b]">
              Ваш тарифный план:
            </h2>

            <div className="border-b border-[#e5e5e5] pb-10">
              <div className="flex items-start gap-6">
                <div className="w-full max-w-[250px] rounded-[4px] bg-white p-6 shadow-[0_0_0_1px_#f1f1f1]">
                  <div className="mb-4 flex justify-center">
                    <div className="h-7 w-7 rounded-full border border-[#d9d9d9]" />
                  </div>

                  <p className="mb-4 text-center text-[16px] text-[#2b2b2b]">
                    Starter
                  </p>

                  <h3 className="mb-3 text-center text-[30px] font-medium text-[#2b2b2b]">
                    Бесплатно
                  </h3>

                  <p className="text-center text-[18px] text-[#0aa06e]">
                    До 10 объявлений
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex flex-col">
                    <p className="text-[15px] text-[#b4b4b4]">
                      Оплачено:
                    </p>
                    <p className="text-[20px] font-medium text-[#0aa06e]">
                      15.10.2020
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-[15px] text-[#b4b4b4]">
                      Действителен до:
                    </p>
                    <p className="text-[20px] font-medium text-[#0aa06e]">
                      15.10.2021
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 max-w-[520px] text-[14px] leading-6 text-[#9b9b9b]">
                <p>
                  * Вы выбрали бесплатный пакет Starter, который действует до
                  15.10.2021.
                </p>
                <p>С 15.09.21 этот пакет будет стоить 499 гривен / месяц</p>
              </div>
            </div>
          </section>

          <section className="pt-10">
            <h2 className="mb-6 text-[24px] font-medium text-[#2b2b2b]">
              Другие тарифные планы:
            </h2>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start  lg:gap-10">
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-2">
                <div className="w-full max-w-[250px] rounded-[4px] bg-white p-6 shadow-[0_0_0_1px_#f1f1f1]">
                  <div className="mb-4 flex justify-center">
                    <div className="relative h-7 w-12">
                      <div className="absolute left-0 top-0 h-7 w-7 rounded-full border border-[#d9d9d9]" />
                      <div className="absolute right-0 top-0 h-7 w-7 rounded-full border border-[#d9d9d9]" />
                    </div>
                  </div>

                  <p className="mb-4 text-center text-[16px] text-[#2b2b2b]">
                    Premium
                  </p>

                  <div className="mb-3 text-center">
                    <span className="text-[42px] font-medium leading-none text-[#2b2b2b]">
                      999
                    </span>
                    <span className="ml-1 text-[14px] text-[#9b9b9b]">
                      / месяц
                    </span>
                  </div>

                  <p className="mb-6 text-center text-[18px] text-[#0aa06e]">
                    До 30 объявлений
                  </p>

                  <div className="flex justify-center">
                    <button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0aa06e] text-[28px] text-[#2b2b2b] transition hover:bg-[#0aa06e] hover:text-white">
                      ›
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-[250px] rounded-[4px] bg-white p-6 shadow-[0_0_0_1px_#f1f1f1]">
                  <div className="mb-4 flex justify-center">
                    <div className="relative h-7 w-[54px]">
                      <div className="absolute left-0 top-0 h-7 w-7 rounded-full border border-[#d9d9d9]" />
                      <div className="absolute left-[14px] top-0 h-7 w-7 rounded-full border border-[#d9d9d9]" />
                      <div className="absolute right-0 top-0 h-7 w-7 rounded-full border border-[#d9d9d9]" />
                    </div>
                  </div>

                  <p className="mb-4 text-center text-[16px] text-[#2b2b2b]">
                    Ultimate
                  </p>

                  <div className="mb-3 text-center">
                    <span className="text-[42px] font-medium leading-none text-[#2b2b2b]">
                      1999
                    </span>
                    <span className="ml-1 text-[14px] text-[#9b9b9b]">
                      / месяц
                    </span>
                  </div>

                  <p className="mb-6 text-center text-[18px] text-[#0aa06e]">
                    До 50 объявлений
                  </p>

                  <div className="flex justify-center">
                    <button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0aa06e] text-[28px] text-[#2b2b2b] transition hover:bg-[#0aa06e] hover:text-white">
                      ›
                    </button>
                  </div>
                </div>
              </div>

              <div className="max-w-[320px] pt-10">
                <p className="mb-6 text-[24px] font-medium leading-[1.45] text-[#2b2b2b]">
                  Для размещения более 50-ти объявлений в месяц, свяжитесь с
                  отделом продаж
                </p>

                <button className="h-[46px] rounded-[4px] bg-[#0aa06e] px-6 text-[14px] font-semibold uppercase text-white transition hover:bg-[#08885d]">
                  ОТДЕЛ ПРОДАЖ
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SellerSubscriptionPage;