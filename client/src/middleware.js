import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API_AUTH;
const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request) {
    console.log("entre")
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");



  try {
    if (!accessToken) {
      console.log("No accessToken found, redirecting to login");
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      // Verifica el accessToken usando jose
      await jwtVerify(accessToken.value, new TextEncoder().encode(JWT_SECRET));
      console.log("accessToken is valid");
      return NextResponse.next();
    } catch (error) {
      console.log("Error verifying accessToken:", error.message);
      if (error.code === 'ERR_JWT_EXPIRED') {
        // El accessToken ha expirado, intentamos renovar con el refreshToken
        if (!refreshToken) {
          console.log("No refreshToken found, redirecting to login");
          return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        
        // Solicita nuevos tokens a la API de renovación usando fetch nativo
        const response = await fetch(`${URL_API_AUTH}/api/token/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: refreshToken.value }),
        });

        if (!response.ok) {
          console.log("Failed to refresh token, redirecting to login");
          return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        const data = await response.json();
        const newAccessToken = data.accessToken;
        

        const newResponse = NextResponse.next();
        newResponse.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        });

        return newResponse;
      } else {
        console.log("Token verification failed, redirecting to login");
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    }
  } catch (error) {
    console.log("Token inválido o expirado:", error.message);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
};