'use client';

import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Brand from "@/components/ui/brand";
import Header from "@/components/ui/header";
import Navbar from "@/components/ui/navbar";

export default function DashboardLayout({ children }) {
  const titleBrand = "MK Revendedoras";

  useEffect(() => {
    const socket = socketIOClient('http://vps-3653258-x.dattaweb.com:3004'); // Ajusta la URL según sea necesario

    // Obtén el useruuid desde la cookie
    const useruuid = Cookies.get('useruuid');
    if (useruuid) {
      socket.emit('join', useruuid);
    }

    socket.on('notification', (message) => {
      console.log('Notification received:', message);
      toast.info(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
