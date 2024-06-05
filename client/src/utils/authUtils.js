
export async function login(formData) {
    const { email, password } = formData;

    try {
        const response = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error login:', error);
        throw new Error('Unable to login');
    }
}

export async function register(formData) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to register');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in register util:', error);
        throw error;
    }
}


