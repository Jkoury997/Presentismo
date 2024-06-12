import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API_AUTH;

export async function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken'); // Assume the token is stored in a cookie named 'accessToken'
  
  try {

    const response = await fetch(`${URL_API_AUTH}/api/user/list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token?.value}` // Access the value of the token
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch employee list' }, { status: response.status });
    }

    const listUser = await response.json();
    return NextResponse.json(listUser, { status: 200 });
  } catch (error) {
    console.error('Error fetching employee details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}