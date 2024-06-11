import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API_AUTH;

export async function POST(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken'); // Assume the token is stored in a cookie named 'accessToken'
  
  try {
    const { searchParams } = new URL(request.url);
    const useruuid = searchParams.get('useruuid');
    const updateData = await request.json(); // Get the data to update from the request body

    if (!useruuid) {
      return NextResponse.json({ error: 'User UUID is required' }, { status: 400 });
    }

    const response = await fetch(`${URL_API_AUTH}/api/user/update/${useruuid}`, {
      method: 'PUT', // Change method to PUT for update
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value}` // Access the value of the token
      },
      body: JSON.stringify(updateData) // Include the update data in the request body
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      return NextResponse.json({ error: errorDetails.message || 'Failed to update user details' }, { status: response.status });
    }

    const updatedUser = await response.json();
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
