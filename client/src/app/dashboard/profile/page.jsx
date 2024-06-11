"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserProfile2 from '@/components/component/user-profile2';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const useruuid = searchParams.get('useruuid');
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    if (useruuid) {
      setUuid(useruuid);
    }
  }, [useruuid]);

  if (!uuid) {
    return <p>Loading...</p>; // Puedes usar un spinner de carga aquí si lo prefieres
  }

  return <UserProfile2 useruuid={uuid} />;
}
