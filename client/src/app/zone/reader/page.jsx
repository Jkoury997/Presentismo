"use client";
import { useState, useEffect, useRef } from "react";
import CardEmployed from "@/components/component/card-employed";
import { useRouter } from "next/navigation";
import QRScanner from "@/components/component/QRScanner";

const NEXT_PUBLIC_URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API_AUTH;
const NEXT_PUBLIC_URL_API_PRESENTISMO = process.env.NEXT_PUBLIC_URL_API_PRESENTISMO;

export default function Reader() {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [lastScannedCode, setLastScannedCode] = useState(null);
  const [scanning, setScanning] = useState(false); // Estado para controlar el escaneo
  const router = useRouter();
  const scannerRef = useRef(null); // Referencia al componente QRScanner

  useEffect(() => {
    const checkZoneUUID = async () => {
      const zoneUUID = localStorage.getItem('zoneUUID');
      if (!zoneUUID) {
        router.push('/zone/configure');
        return;
      }

      try {
        const response = await fetch(`/api/presentismo/zones/find?uuid=${zoneUUID}`);
        if (!response.ok) {
          throw new Error('Zone not found');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching zone:', error);
        localStorage.removeItem('zoneUUID');
        sessionStorage.removeItem('zoneUUID');
        router.push('/zone/configure');
      }
    };

    checkZoneUUID();
  }, [router]);

  useEffect(() => {
    // Limpiar el estado de escaneo al desmontar el componente
    return () => {
      setScanning(false);
    };
  }, []);

  async function registerAttendance(code, location) {
    const response = await fetch(`/api/presentismo/attendance/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, location }),
    });

    if (!response.ok) {
      throw new Error('Failed to check in employee');
    }

    return await response.json();
  }

  async function fetchEmployeeDetails(useruuid) {
    const response = await fetch(`/api/auth/user?useruuid=${useruuid}`);

    if (!response.ok) {
      throw new Error('Failed to fetch employee details');
    }

    return await response.json();
  }

  const handleScan = async (data) => {
    if (data && data.text !== lastScannedCode && !scanning) {
      setScanning(true); // Prevenir múltiples escaneos simultáneos
      const scannedCode = data.text;
      try {
        const location = localStorage.getItem('zoneUUID');
        if (!location) {
          setMessage('Zone not configured. Please configure the zone first.');
          setScanning(false);
          return;
        }

        console.log(`Sending scanned code: ${scannedCode} and location: ${location}`);
        
        const attendanceResponse = await registerAttendance(scannedCode, location);

        // Fetch employee details from Auth API
        const employeeDetails = await fetchEmployeeDetails(attendanceResponse.useruuid);

        setEmployeeDetails(attendanceResponse);
        setEmployee(employeeDetails);
        setMessage(`Employee ${employeeDetails.firstName} ${employeeDetails.lastName} checked in successfully`);

        // Set last scanned code
        setLastScannedCode(scannedCode);
      } catch (error) {
        console.error('Error checking in employee:', error);
        setMessage('Error checking in employee');
      } finally {
        setScanning(false); // Permitir nuevos escaneos
        if (scannerRef.current && scannerRef.current.resetScanner) {
          scannerRef.current.resetScanner(); // Reiniciar el escáner
        }
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Error scanning the QR code. Please try again.");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 space-y-4 md:mr-4">
        <h1 className="text-2xl font-bold">Employee Check-In</h1>
        <p className="text-gray-500 dark:text-gray-400">Scan the QR code to check in.</p>
        <div className="flex items-center justify-center p-1 bg-gray-100 rounded-lg dark:bg-gray-700">
          <QRScanner
            ref={scannerRef} // Referencia al componente QRScanner
            error={error}
            handleScan={handleScan}
            handleError={handleError}
          />
        </div>
        {message && (
          <div className="text-center mt-4">
            <p>{message}</p>
          </div>
        )}
      </div>
      {employee && (
        <div className="mt-3 w-full max-w-md">
          <CardEmployed employee={employee} employeeDetails={employeeDetails} />
        </div>
      )}
    </div>
  );
}
