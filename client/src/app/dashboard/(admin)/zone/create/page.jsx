"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleCreateZone = async () => {
    try {
      const response = await fetch('http://localhost:3004/api/zones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Zona creada exitosamente');
        router.push('/dashboard/zone'); // Redirigir a la página principal o a otra página adecuada
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating zone:', error);
      setMessage('Error creating zone');
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Crear Nueva Zona</h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Define los detalles de la nueva zona que deseas crear.
            </p>
          </div>
          <Card>
            <CardContent className="space-y-6 pt-3">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Zona</Label>
                <Input
                  id="name"
                  placeholder="Ingresa el nombre de la zona"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  className="min-h-[150px]"
                  id="description"
                  placeholder="Ingresa una breve descripción de la zona"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCreateZone}>Crear Zona</Button>
            </CardFooter>
            {message && (
              <div className="text-center mt-4">
                <p>{message}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
