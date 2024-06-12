import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_PRESENTISMO = process.env.NEXT_PUBLIC_URL_API_PRESENTISMO;

export async function GET(req) {
    try {
        const cookieStore = cookies();
        const deviceUUID = cookieStore.get("deviceUUID").value;
        const useruuid = cookieStore.get("useruuid").value;
        const token = cookieStore.get('accessToken');

        if (!deviceUUID || !useruuid) {
            throw new Error('deviceUUID or useruuid not found in cookies');
        }

        // Enviar la solicitud de generación de QR al backend
        const response = await fetch(`${URL_API_PRESENTISMO}/api/qr/generate-qr`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}` // Accede al valor del token

            },
            body: JSON.stringify({ useruuid: useruuid, deviceUUID: deviceUUID })
        });

        const responseData = await response.json();
        console.log(responseData)

        if (response.ok) {
            const { code } = responseData;

            return NextResponse.json(responseData, { status: 201 });
        } else {
            return NextResponse.json({ error: responseData.error }, { status: response.status });
        }
    } catch (error) {
        console.error('Error during QR generation:', error);
        return NextResponse.json({ error: error.message || 'Error during QR generation' }, { status: 500 });
    }
}
