"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FlagIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setMessage("El código de restablecimiento ha sido enviado a tu correo electrónico.");
        setEmail(""); // Limpiar el campo de correo electrónico después del envío
        router.push("/auth/recovery/selector");
      } else {
        const data = await response.json();
        setError(data.error || "Error al enviar el código de restablecimiento.");
      }
    } catch (error) {
      setError("Error al enviar el código de restablecimiento.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="flex justify-center">
          <FlagIcon className="h-12 w-12" />
        </div>
        <div className="mx-auto max-w-md space-y-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Recuperar contraseña</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="ejemplo@dominio.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          {message && <p className="text-green-500 text-center mt-4">{message}</p>}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
