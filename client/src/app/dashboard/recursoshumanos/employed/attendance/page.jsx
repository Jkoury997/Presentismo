"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import AttendanceList from "@/components/component/attendance-list";
import { transformData } from '@/utils/attendance';

export default function Page() {
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch('/api/presentismo/zones');
        const data = await response.json();
        setZones(data);
      } catch (error) {
        console.error('Error fetching zones:', error);
      }
    };

    fetchZones();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userUUID = searchParams.get('userUUID');

        if (!userUUID) {
          console.error('No userUUID found in URL');
          return;
        }

        const response = await fetch(`/api/presentismo/attendance/analytics/user?useruuid=${userUUID}`);
        const data = await response.json();
        const transformedData = transformData(data, zones);
        setUsers(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (zones.length > 0) {
      fetchData();
    }
  }, [searchParams, zones]);

  return (
    <AttendanceList data={users} />
  );
}
