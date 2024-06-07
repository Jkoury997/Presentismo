import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API_AUTH;
const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");
    const refreshToken = cookieStore.get("refreshToken");

    if (!accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
        // Verifica el accessToken usando jose
        const { payload } = await jwtVerify(accessToken.value, new TextEncoder().encode(JWT_SECRET));
        console.log(payload);

        // Verificar el rol del usuario
        const userRole = payload.role;

        // Definir roles permitidos para cada ruta
        const allowedRoles = {
            '/dashboard/admin': ['admin'],
            '/dashboard': ['admin', 'employed', 'recursos_humanos'],
            '/dashboard/recursos-humanos': ['admin', 'recursos_humanos'],
            // Agregar más rutas y roles permitidos según sea necesario
        };

        const pathname = request.nextUrl.pathname;

        // Comprobar si el rol del usuario está permitido en la ruta actual
        const isAuthorized = Object.keys(allowedRoles).some((path) => {
            return pathname.startsWith(path) && allowedRoles[path].includes(userRole);
        });

        if (isAuthorized) {
            return NextResponse.next();
        } else {
            const response = NextResponse.redirect(new URL('/dashboard', request.url));
            response.cookies.set("error", "Access Denied", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });
            return response;
        }
    } catch (error) {
        if (error.code === 'ERR_JWT_EXPIRED') {
            if (!refreshToken) {
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }

            const response = await fetch(`${URL_API_AUTH}/api/token/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: refreshToken.value }),
            });

            if (!response.ok) {
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
            console.error('Token verification error:', error);
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
}

export const config = {
    matcher: ['/dashboard/admin/:path*', '/dashboard/:path*', '/dashboard/recursos-humanos/:path*'], // Rutas protegidas
};
