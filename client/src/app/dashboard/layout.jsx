"use client"

import Brand from "@/components/ui/brand";
import Header from "@/components/ui/header";
import Navbar from "@/components/ui/navbar";
import WebSocketClient from "@/components/component/WebSocketClient";

export default function DashboardLayout({ children }) {
  const titleBrand = "MK Revendedoras";
  
  return (
    <div key="1" className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden bg-gray-100/40 border-r lg:block">
        <div className="flex flex-col gap-2">
          <Brand title={titleBrand}></Brand>
          <div className="flex-1">
            <Navbar></Navbar>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Header title={titleBrand}></Header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <WebSocketClient />
          {children}
        </main>
      </div>
    </div>
  );
}
