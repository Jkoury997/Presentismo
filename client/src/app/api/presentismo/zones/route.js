// /app/api/zones/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken'); // Asume que el token se almacena en una cookie llamada 'accessToken'

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API_PRESENTISMO}/api/zones`, {
      headers: {
        'Authorization': `Bearer ${token?.value}` // Accede al valor del token
      }
    });
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching zones:', error);
    return NextResponse.json({ error: 'Error fetching zones' }, { status: 500 });
  }
}


export async function DELETE(req) {
    const cookieStore = cookies();
    const token = cookieStore.get('accessToken'); // Asume que el token se almacena en una cookie llamada 'accessToken'
  
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Extrae el ID de los parámetros de consulta
  
    if (!id) {
      return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 });
    }
  
    console.log('Deleting zone with ID:', id);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API_PRESENTISMO}/api/zones/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token?.value}`, // Accede al valor del token
          'Content-Type': 'application/json' // Asegúrate de que el tipo de contenido sea JSON
        }
      });
  
      if (!response.ok) {
        console.error('Error response from backend:', response.statusText);
        throw new Error('Error deleting zone');
      }
  
      return NextResponse.json({ message: 'Zone deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting zone:', error);
      return NextResponse.json({ error: 'Error deleting zone' }, { status: 500 });
    }
}