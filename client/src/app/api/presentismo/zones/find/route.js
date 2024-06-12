// /app/api/zones/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken'); // Asume que el token se almacena en una cookie llamada 'accessToken'
  
  // Obtener los parámetros de la URL
  const url = req.nextUrl;
  const uuid = url.searchParams.get('uuid');

  if (!uuid) {
    return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API_PRESENTISMO}/api/zones/${uuid}`, {
      headers: {
        'Authorization': `Bearer ${token?.value}` // Accede al valor del token
      }
    });
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching zones:', error);
    return NextResponse.json({ error: 'Error fetching zones' }, { status: 500 });
  }
}
