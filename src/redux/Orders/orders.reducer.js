import ordersTypes from "./orders.types";

const INITIAL_STATE = {
    orderHistory: [],
    ordersAdmin: []
};

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ordersTypes.SET_USER_ORDER_HISTORY: 
        return {
            ...state,
            orderHistory: action.payload
        }
        case ordersTypes.SET_ORDERS_ADMIN: 
        return {
            ...state,
            ordersAdmin: action.payload
        }
        default:
            return state
    }
};

export default ordersReducer;