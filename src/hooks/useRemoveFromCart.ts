import { useCartProvider } from "@src/providers/CartProvider/useCartProvider";
import { privateAxios } from "@src/utils/privateAxios";
import { useState } from "react";

export function useRemoveFromCart() {
    const {getCartItems} = useCartProvider();
    const [removeFromCartLoading, setRemoveFromCartLoading] = useState<boolean>();

    async function removeFromCart(productId:string, removeAll:boolean) {
        try {
            setRemoveFromCartLoading(true);
            await privateAxios.delete(`/cart/${productId}?removeAll=${removeAll}`);
            getCartItems();
        } catch (e) {
            console.error(e);
        } finally {
            setRemoveFromCartLoading(false);
        }
    }
    return {removeFromCartLoading, removeFromCart}
}