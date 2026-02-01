import type { ReactNode } from "react";
import { SellerHeader } from "@/widgets/seller-header";

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SellerHeader />
      <main className="max-w-7xl mx-auto p-0">
        {children}
      </main>
    </>
  );
}
