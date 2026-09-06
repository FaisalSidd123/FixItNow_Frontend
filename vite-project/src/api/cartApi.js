import { auth } from "../firebase/firebase";

const API_URL = "https://fixitnowbackend-production.up.railway.app/api/cart";

const getHeaders = async () => {

    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
        throw new Error(
            "Authentication required. Please sign in."
        );
    }

    const token = await firebaseUser.getIdToken();

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};


// Fetch current user's cart
export const fetchCart = async () => {

    const headers = await getHeaders();

    const response = await fetch(API_URL, {
        method: "GET",
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch cart."
        );
    }

    return data.cartItems || [];
};


// Add product to cart
export const addCartItem = async (
    productId,
    quantity = 1
) => {

    const headers = await getHeaders();

    const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            productId,
            quantity
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to add product to cart."
        );
    }

    return data;
};


// Update quantity
export const updateCartItem = async (
    productId,
    quantity
) => {

    const headers = await getHeaders();

    const response = await fetch(
        `${API_URL}/${productId}`,
        {
            method: "PUT",
            headers,
            body: JSON.stringify({
                quantity
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to update cart quantity."
        );
    }

    return data;
};


// Remove product
export const removeCartItem = async (
    productId
) => {

    const headers = await getHeaders();

    const response = await fetch(
        `${API_URL}/${productId}`,
        {
            method: "DELETE",
            headers
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to remove product from cart."
        );
    }

    return data;
};


// Clear cart
export const clearCart = async () => {

    const headers = await getHeaders();

    const response = await fetch(
        API_URL,
        {
            method: "DELETE",
            headers
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to clear cart."
        );
    }

    return data;
};