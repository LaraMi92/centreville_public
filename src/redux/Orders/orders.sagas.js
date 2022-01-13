import ordersTypes from "./orders.types";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { handleSaveOrder, handleGetUserOrderHistory, getOrdersAdmin } from "./orders.helpers";
import { setUserOrderHistory, setOrdersAdmin } from "./orders.actions";
import { auth } from "../../firebase/utils";
import { clearCart } from "../Cart/cart.actions";


export function* getUserOrderHistory({payload}){
    try {
        const history = yield handleGetUserOrderHistory(payload);
        yield put(
            setUserOrderHistory(history)
        )
    }
    catch(error){
        console.log(error)
    }
}

export function* onGetUserOderHistoryStart(){
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY, getUserOrderHistory)
}

export function* getUserOrdersAdmin(){
    try {
        const history = yield getOrdersAdmin()
        yield put(
           setOrdersAdmin(history)
        )
    }
    catch(error){
        console.log(error)
    }
}
export function* onGetOrdersAdmin(){
    yield takeLatest(ordersTypes.GET_ORDERS_ADMIN, getUserOrdersAdmin)
}
export function* saveOrderHistory({payload}){
    try {
        const timestamp = new Date();

        yield handleSaveOrder({
            ...payload,
            orderUserId: auth.currentUser.uid,
            orderCreatedDate: timestamp
        });
        yield put (
            clearCart()
        )
    }
    catch(error){
        console.log(error)
    }
}

export function* onSaveOrderHistoryStart(){
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrderHistory)
};

export default function* ordersSagas(){
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOderHistoryStart),
        call(onGetOrdersAdmin)
    ])
};

