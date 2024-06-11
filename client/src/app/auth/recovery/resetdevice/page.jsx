"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    otp: ""
  });

  const [error, setError] = useState("");
  const [newDeviceUuid, setNewDeviceUuid] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Limitar el OTP a 6 dígitos
    if (id === "otp" && value.length > 6) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/device/update-with-otp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el dispositivo.");
      }

      const data = await response.json();
      setNewDeviceUuid(data.device.uuid); // Asumiendo que el UUID se devuelve en data.device.uuid
      // Manejar respuesta exitosa

    } catch (error) {
      setError("Error al actualizar el dispositivo.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Actualizar Dispositivo</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Ingresa el código de 6 dígitos enviado a tu correo electrónico.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              placeholder="ejemplo@dominio.com"
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="otp">Código de 6 dígitos</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="123456"
              required
              maxLength={6}
              value={formData.otp}
              onChange={handleChange}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {newDeviceUuid && (
            <Alert variant="success">
              <AlertTitle>Éxito</AlertTitle>
              <AlertDescription>Nuevo UUID del dispositivo: {newDeviceUuid}</AlertDescription>
            </Alert>
          )}
          <Button className="w-full" type="submit">
            Actualizar Dispositivo
          </Button>
        </form>
      </div>
    </div>
  );
}
