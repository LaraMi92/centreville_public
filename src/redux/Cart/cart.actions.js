import cartTypes from "./cart.types";

export const addProduct = (nextCartItem) => ({
    type: cartTypes.ADD_TO_CART,
    payload: nextCartItem
});

export const removeCartItem = (item) => ({
    type: cartTypes.REMOVE_CART_ITEM,
    payload: item
});

export const reduceCartItem = (item) => ({
    type: cartTypes.REDUCE_CART_ITEM,
    payload: item
});

export const clearCart = () => ({
    type: cartTypes.CLEAR_CART
})