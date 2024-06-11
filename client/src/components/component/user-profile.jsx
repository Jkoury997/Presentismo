import { useState, useEffect } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userDetails, updateUserDetails } from "@/utils/userUtils";

export function UserProfile({ useruuid }) {
  const [user, setUser] = useState({
    profilePicture: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetchUserDetails() {
      const userData = await userDetails(useruuid);
      setUser(userData);
    }

    fetchUserDetails();
  }, [useruuid]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "profilePicture" && files.length > 0) {
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: URL.createObjectURL(files[0]),
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [id]: value,
      }));
    }
  };

  const handleSave = async () => {
    //await updateUserDetails(useruuid, user);
    // Aquí podrías añadir alguna notificación o feedback para el usuario
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Editar Perfil</h1>
          <p className="text-gray-500 dark:text-gray-400">Actualiza tus datos personales</p>
        </div>
        <div className="flex justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage alt="Profile Picture" src={user.profilePicture || "/placeholder-user.jpg"} />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-2">
          <Label htmlFor="profilePicture">Cambiar foto de perfil</Label>
          <Input accept="image/*" id="profilePicture" type="file" onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" placeholder="Ingresa tu nombre" type="text" value={user.name} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input id="lastName" placeholder="Ingresa tu apellido" type="text" value={user.lastName} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" placeholder="Ingresa tu correo electrónico" type="email" value={user.email} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" placeholder="Ingresa tu contraseña" type="password" value={user.password} onChange={handleChange} />
        </div>
        <Button className="w-full" onClick={handleSave}>Guardar</Button>
      </div>
    </div>
  );
}
