"use client";
import { useState, useRef, useEffect } from "react";
import CardEmployed from "@/components/component/card-employed";
import { QrCodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Reader() {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [code, setCode] = useState(''); // Estado para controlar el valor del input
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [code]);

  async function registerAttendance(code, location) {
    const response = await fetch('http://localhost:3004/api/attendance/register-attendance', {
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
    const response = await fetch(`http://localhost:3005/api/user/${useruuid}`);

    if (!response.ok) {
      throw new Error('Failed to fetch employee details');
    }

    return await response.json();
  }

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const trimmedCode = code.trim();
      if (trimmedCode) {
        try {
          const location = localStorage.getItem('zoneUUID');
          if (!location) {
            router.push('/zone/configure');
            return;
          }

          console.log(`Sending code: ${trimmedCode} and location: ${location}`);
          
          const attendanceResponse = await registerAttendance(trimmedCode, location);

          // Fetch employee details from Auth API
          const employeeDetails = await fetchEmployeeDetails(attendanceResponse.useruuid);

          setEmployeeDetails(attendanceResponse);
          setEmployee(employeeDetails);
          setMessage(`Employee ${employeeDetails.firstName} ${employeeDetails.lastName} checked in successfully`);
          
          // Clear the input value
          setCode('');
        } catch (error) {
          setCode('');
          console.error('Error checking in employee:', error);
          setMessage('Error checking in employee');
        }
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 space-y-4 md:mr-4">
        <h1 className="text-2xl font-bold">Employee Check-In</h1>
        <p className="text-gray-500 dark:text-gray-400">Scan the QR code to check in.</p>
        <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg dark:bg-gray-700">
          <input
            type="text"
            ref={inputRef}
            value={code} // Asociar el valor del input al estado
            onChange={(e) => setCode(e.target.value)} // Actualizar el estado en cada cambio
            onKeyPress={handleKeyPress}
            className="opacity-0 absolute"
            autoFocus
          />
          <QrCodeIcon className="w-24 h-32 text-gray-500 dark:text-gray-400" />
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
