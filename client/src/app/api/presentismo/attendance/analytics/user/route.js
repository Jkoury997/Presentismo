import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_PRESENTISMO = process.env.NEXT_PUBLIC_URL_API_PRESENTISMO;

export async function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken'); // Assume the token is stored in a cookie named 'accessToken'

  const { searchParams } = new URL(request.url);
  const useruuid = searchParams.get('useruuid');
  console.log('useruuid:', useruuid); // Debug log

  if (!useruuid) {
    return NextResponse.json({ error: 'Missing useruuid parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(`${URL_API_PRESENTISMO}/api/analytics/user/${useruuid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token?.value}` // Access the value of the token
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch attendance list' }, { status: response.status });
    }

    const listAttendance = await response.json();
    return NextResponse.json(listAttendance, { status: 200 });
  } catch (error) {
    console.error('Error fetching employee attendance list:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
