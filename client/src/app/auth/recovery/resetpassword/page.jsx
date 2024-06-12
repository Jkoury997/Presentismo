"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { login } from "@/utils/authUtils";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/recovery/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al restablecer la contraseña.");
      }

      const data = await response.json();
      // Manejar respuesta exitosa
      await login(formData.email, formData.password);
      router.push("/auth/login");

    } catch (error) {
      setError("Error al restablecer la contraseña.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Ingresa tu código</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Ingresa el código de 6 dígitos enviado a tu correo electrónico y tu contraseña
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
          <div className="relative">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              placeholder="••••••••"
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              className="absolute bottom-1 right-1 h-7 w-7"
              size="icon"
              variant="ghost"
              type="button"
              onClick={handleTogglePassword}
            >
              {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
          <div className="relative">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              required
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button
              className="absolute bottom-1 right-1 h-7 w-7"
              size="icon"
              variant="ghost"
              type="button"
              onClick={handleToggleConfirmPassword}
            >
              {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              <span className="sr-only">Toggle confirm password visibility</span>
            </Button>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              "Cambiar contraseña"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
