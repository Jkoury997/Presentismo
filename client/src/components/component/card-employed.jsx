import React from 'react';
import { UserIcon } from 'lucide-react';

export default function CardEmployed({ employee, employeeDetails }) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 md:max-w-lg md:flex md:items-center md:p-8 dark:bg-gray-800">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="bg-gray-100 rounded-full p-6 dark:bg-gray-700">
            <UserIcon className="h-24 w-24 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold mb-2 dark:text-gray-200">Employee Profile</h1>
          <div className="text-lg font-medium dark:text-gray-200">{`${employee.firstName} ${employee.lastName}`}</div>
          <div className="text-gray-500 dark:text-gray-400">{employee.email}</div>
          <div className="text-gray-500 dark:text-gray-400">{employee.dni}</div>
          <div className="text-gray-500 dark:text-gray-400">Clocked in at {new Date(employeeDetails.entryTime).toLocaleTimeString()}</div>
          {employeeDetails.exitTime && <div className="text-gray-500 dark:text-gray-400">Clocked out at {new Date(employeeDetails.exitTime).toLocaleTimeString()}</div>}
          <div className="text-gray-500 dark:text-gray-400">
            You need to scan the QR code in your app to clock in and out.
          </div>
        </div>
      </div>
    </div>
  );
}
