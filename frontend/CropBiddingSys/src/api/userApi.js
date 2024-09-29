// src/api/userApi.js
export const fetchUserProfile = async (userId) => {
    const response = await fetch(`https://localhost:5000/api/users/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }
    return response.json();
};
