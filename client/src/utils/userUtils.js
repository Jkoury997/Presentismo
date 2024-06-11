export async function userDetails(useruuid) {
    try {
        const response = await fetch(`/api/auth/user?useruuid=${useruuid}`);

        if (!response.ok) {
            throw new Error('Failed to fetch employee details');
          }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in user details:', error);
        throw error;
    }
}

export async function updateUserDetails(useruuid, updateData) {
    try {
        const response = await fetch(`/api/auth/user/update?useruuid=${useruuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || 'Failed to update user details');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in user details:', error);
        throw error;
    }
}
