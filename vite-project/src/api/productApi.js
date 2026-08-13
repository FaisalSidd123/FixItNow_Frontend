import { auth } from "../firebase/firebase";

const API_URL = "http://localhost:5000/api/products";

export const fetchProducts = async () => {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
        throw new Error("User is not authenticated.");
    }

    const token = await firebaseUser.getIdToken();

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const errorData =
            await response.json().catch(() => ({}));

        throw new Error(
            errorData.error || "Failed to fetch products"
        );
    }

    const data = await response.json();

    return data.products || [];
};
export const fetchPublicProducts = async () => {

    const response = await fetch(
        "http://localhost:5000/api/products/public"
    );

    if (!response.ok) {

        const errorData =
            await response.json().catch(() => ({}));

        throw new Error(
            errorData.error ||
            "Failed to fetch public products"
        );
    }

    const data = await response.json();

    return data.products || [];
};
export const fetchPublicProductById = async (productId) => {

    const response = await fetch(
        `http://localhost:5000/api/products/public/${productId}`
    );

    if (!response.ok) {

        const errorData =
            await response.json().catch(() => ({}));

        throw new Error(
            errorData.error ||
            "Failed to fetch product"
        );
    }

    const data = await response.json();

    return data.product;
};
export const createProduct = async (productData) => {

    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
        throw new Error("User is not authenticated.");
    }

    const token = await firebaseUser.getIdToken();

    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },

        body: JSON.stringify(productData)
    });


    if (!response.ok) {

        const errorData =
            await response.json().catch(() => ({}));

        throw new Error(
            errorData.error ||
            "Failed to create product"
        );
    }


    const data = await response.json();

    return data.product;
};
export const updateProduct = async (productId, productData) => {

    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
        throw new Error("User is not authenticated.");
    }

    const token = await firebaseUser.getIdToken();


    const response = await fetch(
        `${API_URL}/${productId}`,
        {
            method: "PUT",

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify(productData)
        }
    );


    if (!response.ok) {

        const errorData =
            await response.json().catch(() => ({}));

        throw new Error(
            errorData.error ||
            "Failed to update product"
        );
    }


    const data = await response.json();

    return data.product;
};
export const deleteProduct = async (productId) => {

    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
        throw new Error("User is not authenticated.");
    }

    const token = await firebaseUser.getIdToken();


    const response = await fetch(
        `${API_URL}/${productId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );


    if (!response.ok) {

        const errorData =
            await response.json().catch(() => ({}));

        throw new Error(
            errorData.error ||
            "Failed to delete product"
        );
    }


    const data = await response.json();

    return data.product;
};