"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertDescription, Alert } from "@/components/ui/alert";
import { EyeIcon, EyeOffIcon, FlagIcon, LoaderIcon, TriangleAlertIcon } from "lucide-react";
import { login } from "@/utils/authUtils";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error,setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const deviceUUID = Cookies.get('deviceUUID');

    if (accessToken && refreshToken && deviceUUID) {
      // Si existen el accessToken, refreshToken y deviceUUID, redirigir al dashboard
      router.push("/dashboard");
    } else {
      const localDeviceUUID = localStorage.getItem('deviceUUID');
      if (localDeviceUUID) {
        // Si existe deviceUUID en localStorage, guardarlo en cookies y sessionStorage y redirigir al dashboard
        Cookies.set('deviceUUID', localDeviceUUID, { path: '/' });
        sessionStorage.setItem('deviceUUID', localDeviceUUID);
      } else {
        // Si no existe nada, redirigir al register
        router.push("/auth/register");
      }
    }
  }, [router]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    
    try {
      const data = await login({ email, password });
      console.log("Login successful:", data);
      
      // Redirigir al dashboard después de un pequeño retraso para asegurar que las cookies están establecidas
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error) {
      console.error("Error during login:", error);
      setError(error)
      setShowError(true);
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
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
          </div>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link className="text-sm underline" href="#">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                placeholder="••••••••"
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {showError && (
              <Alert variant="destructive">
                <TriangleAlertIcon className="h-4 w-4" />
                <AlertDescription>Your email or password is incorrect.</AlertDescription>
              </Alert>
            )}
            <div className="flex items-center justify-between">
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
            </div>
          </form>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?
            <Link className="font-medium underline" href="/register">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
