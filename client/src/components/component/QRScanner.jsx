import React, { forwardRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

// Importar react-qr-scanner dinámicamente para evitar problemas con SSR
const QrScanner = dynamic(() => import("react-qr-scanner"), { ssr: false });

const QRScanner = forwardRef(({ error, handleScan, handleError }, ref) => {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Verificar la compatibilidad de getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsSupported(false);
    }
  }, []);

  const previewStyle = {
    height: 300,
    width: '100%',
  };

  const videoConstraints = {
    facingMode: "environment"
  };

  if (!isSupported) {
    return (
      <section ref={ref} className="w-full p-1">
        <Alert variant="destructive">
          <TriangleAlertIcon className="h-4 w-4" />
          <AlertDescription>
            Este dispositivo no soporta la API de getUserMedia necesaria para el escaneo de QR.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  return (
    <section ref={ref} className="w-full p-1">
      <div className="w-full max-w-md">
        {error ? (
          <Alert variant="destructive">
            <TriangleAlertIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <QrScanner
            delay={300}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            constraints={{ video: videoConstraints }}
          />
        )}
      </div>
    </section>
  );
});

QRScanner.displayName = 'QRScanner';

export default QRScanner;
