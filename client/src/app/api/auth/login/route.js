import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API_AUTH;

export async function POST(req) {
    try {
        const body = await req.json();
        const cookieStore = cookies();
        let deviceUUID = cookieStore.get("deviceUUID").value;
        
        
        if (!deviceUUID) {
            return NextResponse.json({ message: 'Device not found' }, { status: 401 });
        }

        // Supongamos que el cuerpo de la solicitud incluye el email y password
        const { email, password } = body;
        console.log(body.email, body.password, deviceUUID)
        // Enviar la solicitud de inicio de sesión al backend
        const response = await fetch(`${URL_API_AUTH}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, deviceUUID })
        });

        const responseData = await response.json();

        if (response.ok) {
            // Guardar tokens en cookies
            cookieStore.set('accessToken', responseData.accessToken, { path: '/' });
            cookieStore.set('refreshToken', responseData.refreshToken, { path: '/' });
            cookieStore.set('useruuid', responseData.user.uuid, { path: '/' });

            return NextResponse.json(responseData);
        } else {
            return NextResponse.json({ error: responseData.error }, { status: response.status });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: error.message || 'Error during login' }, { status: 500 });
    }
}
