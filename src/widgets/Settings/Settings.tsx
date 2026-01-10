"use client";

function Accordion({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl border px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">
      <span className="text-sm font-medium">{title}</span>
      <span className="text-green-600 text-xl">⌄</span>
    </div>
  );
}

export const Settings = () => {
  return (
    <>
      <div className="mb-6 mt-[20px]">
        <p className="text-base font-medium mt-1.5">
          Профиль <span className="text-gray-500">mail@gmail.com</span>
        </p>

        <button className="text-sm text-[#009661] hover:underline mt-1">
          Выйти из аккаунта
        </button>
      </div>

      <div className="space-y-4">
        <Accordion title="Настройки аккаунта" />
        <Accordion title="Изменить контактную информацию" />
      </div>
    </>
  );
};
