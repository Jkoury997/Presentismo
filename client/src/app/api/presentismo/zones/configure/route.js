// /app/api/zones/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
    const body = await req.json();
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken'); // Asume que el token se almacena en una cookie llamada 'accessToken'
    const { zoneUUID } = body

    try {
        const response = await fetch(`${NEXT_PUBLIC_URL_API_PRESENTISMO}/api/zones/link-device`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}` // Accede al valor del token
          },
          body: JSON.stringify({ zoneUUID}),
        });
  
        const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching zones:', error);
    return NextResponse.json({ error: 'Error fetching zones' }, { status: 500 });
  }
}