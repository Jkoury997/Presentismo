import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_PRESENTISMO = process.env.NEXT_PUBLIC_URL_API_PRESENTISMO;

const buildDateTime = (date, time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const dateTime = new Date(date);

  // Ajustar la hora y los minutos
  dateTime.setHours(hours);
  dateTime.setMinutes(minutes);
  dateTime.setSeconds(0);
  dateTime.setMilliseconds(0);

  return dateTime;
};

export async function PUT(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken'); // Asume que el token se almacena en una cookie llamada 'accessToken'
  const useruuid = cookieStore.get('useruuid');

  try {
    const { entryTime, exitTime, date, id } = await request.json();

    // Construir fechas a partir de la fecha y los tiempos
    const entryDate = buildDateTime(date, entryTime);
    const exitDate = buildDateTime(date, exitTime);

    // Convertir entryTime y exitTime a formato UTC
    const entryTimeUTC = entryDate.toISOString();
    const exitTimeUTC = exitDate.toISOString();

    console.log(entryTimeUTC, exitTimeUTC);

    // Realizar una solicitud a tu API para actualizar la asistencia
    const response = await fetch(`${URL_API_PRESENTISMO}/api/attendance/update-attendance/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value}` // Accede al valor del token
      },
      body: JSON.stringify({ entryTime: entryTimeUTC, exitTime: exitTimeUTC, modifiedBy: useruuid?.value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: `Network response was not ok: ${errorData.message}` }, { status: response.status });
    }

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error during attendance update:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
