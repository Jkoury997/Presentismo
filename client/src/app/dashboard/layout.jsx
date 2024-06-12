'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSocket from '@/hooks/useSocket';
import Brand from "@/components/ui/brand";
import Header from "@/components/ui/header";
import Navbar from "@/components/ui/navbar";

export default function DashboardLayout({ children }) {
  const titleBrand = "FichAqui";

  // Estado para almacenar el useruuid y userRole
  const [useruuid, setUseruuid] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Obtén el useruuid y userRole desde las cookies cuando el componente se monta
  useEffect(() => {
    const uuid = Cookies.get('useruuid');
    const role = Cookies.get('userRole');
    setUseruuid(uuid);
    setUserRole(role);
  }, []);

  // Conéctate al socket usando el useruuid
  useSocket(useruuid);

  // Renderizar condicionalmente si useruuid y userRole están disponibles
  if (!useruuid || !userRole) {
    return <div>Loading...</div>;
  }

  return (
    <div key="1" className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden bg-gray-100/40 border-r lg:block">
        <div className="flex flex-col gap-2">
          <Brand title={titleBrand}></Brand>
          <div className="flex-1">
            <Navbar userRole={userRole}></Navbar>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Header userRole={userRole} title={titleBrand}></Header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
