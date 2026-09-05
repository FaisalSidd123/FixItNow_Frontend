import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/firebase";

import {
    fetchCart,
    addCartItem,
    updateCartItem,
    removeCartItem,
    clearCart as clearCartApi
} from "../../api/cartApi.js"


const CartContext = createContext();


export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);


    // Load cart whenever authentication changes
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            async (user) => {

                if (!user) {
                    setCartItems([]);
                    setLoading(false);
                    return;
                }

                try {

                    setLoading(true);

                    const items = await fetchCart();

                    setCartItems(items);

                } catch (error) {

                    console.error(
                        "Failed to load cart:",
                        error
                    );

                    setCartItems([]);

                } finally {

                    setLoading(false);

                }
            }
        );

        return unsubscribe;

    }, []);


    const addToCart = async (
        product,
        quantity = 1
    ) => {

        try {

            const existingItem = cartItems.find(
                (item) =>
                    item.id === product.id
            );

            const currentQuantity =
                existingItem
                    ? existingItem.quantity
                    : 0;

            const newQuantity = Math.min(
                currentQuantity + quantity,
                Number(product.stock)
            );

            if (newQuantity <= 0) {
                throw new Error(
                    "This product is out of stock."
                );
            }

            await addCartItem(
                product.id,
                newQuantity - currentQuantity
            );

            // Fetch updated cart
            const updatedCart = await fetchCart();

            setCartItems(updatedCart);

        } catch (error) {

            console.error(
                "Add to cart error:",
                error
            );

            throw error;

        }
    };


    const removeFromCart = async (
        productId
    ) => {

        try {

            await removeCartItem(productId);

            setCartItems((prevItems) =>
                prevItems.filter(
                    (item) =>
                        item.id !== productId
                )
            );

        } catch (error) {

            console.error(
                "Remove from cart error:",
                error
            );

            throw error;

        }
    };


    const updateQuantity = async (
        productId,
        quantity
    ) => {

        try {

            const item = cartItems.find(
                (item) =>
                    item.id === productId
            );

            if (!item) {
                return;
            }

            const safeQuantity = Math.max(
                1,
                Math.min(
                    quantity,
                    Number(item.stock)
                )
            );

            await updateCartItem(
                productId,
                safeQuantity
            );

            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === productId
                        ? {
                            ...item,
                            quantity:
                                safeQuantity
                        }
                        : item
                )
            );

        } catch (error) {

            console.error(
                "Update cart quantity error:",
                error
            );

            throw error;

        }
    };


    const clearCart = async () => {

        try {

            await clearCartApi();

            setCartItems([]);

        } catch (error) {

            console.error(
                "Clear cart error:",
                error
            );

            throw error;

        }
    };


    return (
        <CartContext.Provider
            value={{
                cartItems,
                loading,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}


export function useCart() {

    return useContext(CartContext);

}