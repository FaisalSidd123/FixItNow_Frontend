import { getAuth } from "firebase/auth";

export const getOverview = async (range = "Last 30 Days") => {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error("User not logged in");
    }

    const token = await currentUser.getIdToken();

    const response = await fetch(
        `https://fixitnowbackend-production.up.railway.app/api/overview?range=${encodeURIComponent(range)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to fetch overview data"
        );
    }

    return data;
};