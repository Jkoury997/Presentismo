"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Seleccione opcion</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Recorda que se envio un código de 6 dígitos a tu correo electrónico.
          </p>
        </div>
        <form className="space-y-4">
          <Link href="/auth/recovery/resetpassword">
            <Button className="w-full mt-4" type="button">
              Cambiar Contraseña
            </Button>
          </Link>
          <Link href="/auth/recovery/resetdevice" >
            <Button className="w-full mt-3" type="button">
              Actualizar Dispositivo
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
