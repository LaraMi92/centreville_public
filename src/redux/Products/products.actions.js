
import productsTypes from "./products.types";

export const addProductStart = (product) => ({
    type: productsTypes.ADD_NEW_PRODUCT_START,
    payload: product
});

export const fetchProductsStart = () => ({
    type: productsTypes.FETCH_PRODUCTS_START
});

export const setProducts = (products) => ({
    type: productsTypes.SET_PRODUCTS,
    payload: products
});

export const deleteProductStart = (product) => ({
    type: productsTypes.DELETE_PRODUCT_START,
    payload: product
});

export const finishDeleteProduct = (id) => ({
    type: productsTypes.FINISH_DELETE_PRODUCT,
    payload: id
});

export const fetchProductStart = productId => ({
    type: productsTypes.FETCH_PRODUCT_START,
    payload: productId
});

export const setProduct = product => ({
    type: productsTypes.SET_PRODUCT,
    payload: product
});