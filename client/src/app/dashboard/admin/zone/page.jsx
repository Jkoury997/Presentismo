"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { QrCodeIcon, TrashIcon, EditIcon } from "lucide-react";
import * as Dialog from '@radix-ui/react-dialog';
import QRCode from 'react-qr-code';

const NEXT_PUBLIC_URL_API_PRESENTISMO = process.env.NEXT_PUBLIC_URL_API_PRESENTISMO

export default function Page() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentQR, setCurrentQR] = useState('');
  const router = useRouter();


  useEffect(() => {
    const fetchZones = async () => {
      
      try {
        const response = await fetch('/api/presentismo/zones');
        const data = await response.json();
        setZones(data);
      } catch (error) {
        setError('Error fetching zones');
        console.error('Error fetching zones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/presentismo/zones?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setZones(zones.filter((zone) => zone._id !== id));
      } else {
        throw new Error('Error deleting zone');
      }
    } catch (error) {
      console.error('Error deleting zone:', error);
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality
  };

  const handleQR = (id) => {
    console.log(id)
  
    setCurrentQR(id);
    setOpen(true);
  };

  const handleAdd = () => {
    // Implement add functionality
    router.push('/dashboard/admin/zone/create');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Zonas</h2>
          <Button onClick={handleAdd}>Agregar Zona</Button>
        </div>
        <div className="grid gap-4">
          {zones.map((zone) => (
            <div
              key={zone._id}
              className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between dark:bg-gray-800"
            >
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">{zone.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{zone.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => handleQR(zone.uuid)} className="md:hidden">
                  <QrCodeIcon className="w-4 h-4" />
                  <span className="sr-only">Ver QR</span>
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(zone._id)} className="md:hidden">
                  <EditIcon className="w-4 h-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(zone._id)} className="md:hidden">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQR(zone.uuid)}
                  className="hidden md:inline-flex"
                >
                  Ver QR
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(zone._id)}
                  className="hidden md:inline-flex"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(zone._id)}
                  className="hidden md:inline-flex"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg">
          <Dialog.Title className="text-lg font-bold">Código QR</Dialog.Title>
          <Dialog.Description className="mt-2">
            Escanee este código QR para configurar la zona.
          </Dialog.Description>
          <div className="flex justify-center mt-4">
            <QRCode value={currentQR} size={256} />
          </div>
          <Dialog.Close asChild>
            <Button className="mt-4" variant="outline">Cerrar</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </section>
  );
}
