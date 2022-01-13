import ordersTypes from "./orders.types";

export const saveOrderHistory = (order) => ({
    type: ordersTypes.SAVE_ORDER_HISTORY_START,
    payload: order
});

export const getUserOrderHistory = (user) => ({
    type: ordersTypes.GET_USER_ORDER_HISTORY,
    payload: user
});

export const setUserOrderHistory = (user) => ({
    type: ordersTypes.SET_USER_ORDER_HISTORY,
    payload: user
});

export const getOrdersAdmin = () => ({
    type: ordersTypes.GET_ORDERS_ADMIN
})

export const setOrdersAdmin = (orders) => ({
    type: ordersTypes.SET_ORDERS_ADMIN,
    payload: orders
});