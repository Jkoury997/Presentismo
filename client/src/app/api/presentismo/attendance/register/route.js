import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_PRESENTISMO = process.env.NEXT_PUBLIC_URL_API_PRESENTISMO;

export async function POST(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken'); // Asume que el token se almacena en una cookie llamada 'accessToken'
  try {
    const { code, location } = await request.json();

    // Realizar una solicitud a tu API para registrar la asistencia
    const response = await fetch(`${URL_API_PRESENTISMO}/api/attendance/register-attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value}` // Accede al valor del token
      },
      body: JSON.stringify({ code, location }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: `Error: ${errorData.message}` }, { status: response.status });
    }

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error during attendance registration:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
