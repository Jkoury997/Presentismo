import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API_AUTH;

export async function GET() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token not found" }, { status: 401 });
    }

    // Eliminar las cookies de los tokens
    cookieStore.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
    });
    cookieStore.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
    });
    cookieStore.set("useruuid", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
    });

    // Realizar una solicitud a tu API para invalidar los tokens en el servidor
    let response;
    try {
      response = await fetch(`${URL_API_AUTH}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken.value })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ error: `Network response was not ok: ${errorData.message}` }, { status: response.status });
      }
    } catch (networkError) {
      return NextResponse.json({ error: `Network error: ${networkError.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
