import { RegisterPage } from "@/pages/RegisterPage/ui/RegisterPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div className="py-10 text-center">Загрузка...</div>}>
      <RegisterPage />
    </Suspense>
  );
};

export default Page;