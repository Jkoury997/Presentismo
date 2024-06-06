"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { InfoIcon, LocateIcon, QrCodeIcon, TagIcon } from "lucide-react";
import QRScanner from "@/components/component/QRScanner";

const NEXT_PUBLIC_URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API_AUTH
const NEXT_PUBLIC_URL_API_PRESENTISMO = process.env.NEXT_PUBLIC_URL_API_PRESENTISMO

export default function Page() {
  const [message, setMessage] = useState('');
  const [zoneUUID, setZoneUUID] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const inputRef = useRef(null);
  const qrLinkSectionRef = useRef(null);
  const [isLinkingNewQR, setIsLinkingNewQR] = useState(false);

  useEffect(() => {
    const deviceUUID = localStorage.getItem('deviceUUID');
    const zoneUUID = localStorage.getItem('zoneUUID');
    if (deviceUUID && zoneUUID) {
      router.push('/zone/reader'); // Redirect to reader if already configured
    }
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input on mount
    }
  }, [router]);

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const data = e.target.value.trim();
      if (data) {
        try {
          // Enviar la solicitud de vinculación del dispositivo al backend
          const response = await fetch(`${NEXT_PUBLIC_URL_API_PRESENTISMO}/api/zones/link-device`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ zoneUUID: data }),
          });

          if (!response.ok) {
            throw new Error('Failed to configure device');
          }

          const responseData = await response.json();
          const { deviceUUID } = responseData;

          localStorage.setItem('deviceUUID', deviceUUID);
          localStorage.setItem('zoneUUID', data);
          document.cookie = `deviceUUID=${deviceUUID}; path=/`;
          document.cookie = `zoneUUID=${data}; path=/`;

          setZoneUUID(data);
          setMessage(`Device configured for zone: ${data}`);
          
          // Mostrar la información de la zona
          const zoneInfo = document.getElementById("zone-info");
          zoneInfo.querySelector("#zone-address").textContent = data; // Asumiendo que el nombre de la zona está en zoneUUID para este ejemplo
          zoneInfo.querySelector("#zone-name").textContent = data;
          zoneInfo.querySelector("#zone-description").textContent = "Descripción de la zona"; // Placeholder
          zoneInfo.classList.remove("hidden");

          router.push('/zone/reader'); // Redirect to reader after configuration
        } catch (error) {
          console.error('Error configuring device:', error);
          setMessage('Error configuring device');
        }
      }
    }
  };

  useEffect(() => {
    if (isLinkingNewQR && qrLinkSectionRef.current) {
      qrLinkSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLinkingNewQR]);

  const handleScan = async (data) => {
    if (data) {
      const qrGeneralUUID = data.text;
      setZoneUUID(qrGeneralUUID);
      try {
        const response = await fetch('http://localhost:3004/api/zones/link-device', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ zoneUUID: qrGeneralUUID }),
        });

        if (!response.ok) {
          throw new Error('Failed to configure device');
        }

        const responseData = await response.json();
        const { deviceUUID } = responseData;

        localStorage.setItem('deviceUUID', deviceUUID);
        localStorage.setItem('zoneUUID', qrGeneralUUID);
        document.cookie = `deviceUUID=${deviceUUID}; path=/`;
        document.cookie = `zoneUUID=${qrGeneralUUID}; path=/`;

        setZoneUUID(qrGeneralUUID);
        setMessage(`Device configured for zone: ${qrGeneralUUID}`);

        router.push('/zone/reader'); // Redirect to reader after configuration
      } catch (err) {
        setError("Error al realizar la acción con el UUID. Por favor, intenta nuevamente.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Error al escanear el código QR. Por favor, intenta nuevamente.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Configure Your Zone</h1>
          <p className="text-gray-500 dark:text-gray-400">Scan the QR code to set up your zone.</p>
          <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg dark:bg-gray-700">
            <QRScanner
              ref={qrLinkSectionRef}
              error={error}
              handleScan={handleScan}
              handleError={handleError}
            />
            <input
              type="text"
              ref={inputRef}
              onKeyPress={handleKeyPress}
              className="opacity-0 absolute"
              autoFocus
            />
          </div>
          {message && (
            <div className="text-center mt-4">
              <p>{message}</p>
            </div>
          )}
          <div className="space-y-2 hidden" id="zone-info">
            <h2 className="text-xl font-bold">Zone Information</h2>
            <div className="flex items-center space-x-2">
              <LocateIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <p id="zone-address" className="text-gray-500 dark:text-gray-400"></p>
            </div>
            <div className="flex items-center space-x-2">
              <TagIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <p id="zone-name" className="text-gray-500 dark:text-gray-400"></p>
            </div>
            <div className="flex items-center space-x-2">
              <InfoIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <p id="zone-description" className="text-gray-500 dark:text-gray-400"></p>
            </div>
          </div>
          {zoneUUID && (
            <div className="mt-4 text-center text-green-500">
              <p>Recognized Zone UUID: {zoneUUID}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
