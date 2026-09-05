const API_URL = "http://localhost:5000/api/users";


export const checkAdminStatus = async (token) => {

    const response = await fetch(
        `${API_URL}/admin-check`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );


    const data = await response.json();

    return data;
};