import { LoginPage } from "@/pages/LoginPage/ui/LoginPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div className="py-10 text-center">Загрузка...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default Page;