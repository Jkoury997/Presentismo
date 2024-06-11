import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { userDetails, updateUserDetails } from "@/utils/userUtils";

export default function UserProfile2({ useruuid }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dni: ""
  });

  useEffect(() => {
    async function fetchUserDetails() {
      const userData = await userDetails(useruuid);
      setUser({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        dni: userData.dni || "",
        password: "", // O podrías omitir la contraseña para evitar que se muestre
      });
    }

    fetchUserDetails();
  }, [useruuid]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserDetails(useruuid, user);
      // Aquí podrías añadir alguna notificación o feedback para el usuario
      alert("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Error al actualizar el usuario");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter">Editar Perfil</h2>
          <p className="text-gray-500 dark:text-gray-400">Actualiza tu información de perfil.</p>
        </div>
        <Card>
          <CardContent className="grid gap-4">
            <div className="grid gap-2 pt-4">
              <Label htmlFor="firstName">Nombre</Label>
              <Input id="firstName" placeholder="Ingresa tu nombre" type="text" value={user.firstName} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" placeholder="Ingresa tu apellido" type="text" value={user.lastName} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dni">D.N.I.</Label>
              <Input id="dni" placeholder="Ingresa tu D.N.I." type="number" value={user.dni} onChange={handleChange} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" placeholder="Ingresa tu correo electrónico" type="email" value={user.email} onChange={handleChange} disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSave}>Guardar cambios</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
