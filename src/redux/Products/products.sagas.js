import {takeLatest, put, all, call} from 'redux-saga/effects';
import { addProductStart, setProducts, fetchProductsStart, finishDeleteProduct, setProduct } from './products.actions';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct, handleDeleteProductFinish, handleFetchProduct } from './products.helpers';
import productsTypes from './products.types';
import { auth } from '../../firebase/utils';

export function* addProduct({payload: {
    title,
    picture,
    type,
    category,
    characteristics,
    price,
    description,
    tracklist
}}){
    try{
        const timestamp = new Date();

        yield handleAddProduct({
            title, picture, type, category, characteristics, price, description, tracklist,
            productAdminUserUID: auth.currentUser.uid,
            createdAt: timestamp
        })
        yield put(
            fetchProductsStart()
        )
    } catch(error){
        
    }
}

export function* onAddProductStart(){
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts(){
    try {
        const products = yield handleFetchProducts();
        yield put(
            setProducts(products)
        )
    } catch(error){
        console.log(error)
    }
}

export function* onFetchProductsStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({payload}){
    try {
        yield handleDeleteProduct(payload);
        yield put(
            finishDeleteProduct(payload)
        )
    } catch(error){
        console.log(error)
    }
}

export function* onDeleteProductStart(){
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* deleteProductFinish({payload}){
    try{
        yield handleDeleteProductFinish(payload);
        yield put(
            fetchProductsStart()
        )
    } catch(error){
        console.log(error)
    }
}
export function* onDeleteFinish(){
    yield takeLatest(productsTypes.FINISH_DELETE_PRODUCT, deleteProductFinish)
}

export function* fetchProduct({payload}){
    try {
      const product = yield handleFetchProduct(payload);
      yield put(
          setProduct(product)
      )
    }
    catch(error){
        console.log(error)
    }
}

export function* onFetchProductStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCT_START,fetchProduct)
}

export default function* productsSagas(){
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onDeleteFinish),
        call(onFetchProductStart)
    ])
}