import React, {useState, useEffect} from "react";
import './styles.scss';

import { useTranslation } from 'react-i18next';
import "../../translations/i18n";

import AdminProductModal from "../../components/AdminProductModal";
import Directory from "../../components/Directory";

import { useSelector, useDispatch } from "react-redux";
import { getOrdersAdmin } from "../../redux/Orders/orders.actions";

const mapState = (reducer) => ({
    products: reducer.productsData.products,
    ordersAdmin: reducer.ordersData.ordersAdmin
    });

const Admin = () => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const {products, ordersAdmin} = useSelector(mapState);
    const [modal, setModal] = useState(false);

    const date = (timestamp) => new Date(timestamp.seconds * 1000).toDateString();

    useEffect(() => {

    }, [products]);

    useEffect(() => {
        dispatch(
            getOrdersAdmin()
        )
    }, []);

    return(
        <div>
            {modal && <AdminProductModal setModal={setModal}/>}
            <div className="account admin">
            <div className="account-details account-column admin-column">
            <h1>{t("Shop administration")}</h1>
            <button className="button" onClick={() => setModal(true)}>{t('Add new product')}</button>
            <div id="admin-directory">
            <Directory filter="" products={products}/>
            </div>
            </div>

            <div className="account-details account-column">
            <h1>{t("Users orders")}</h1>
            {ordersAdmin?.data?.length > 0 ?
            ordersAdmin.data.map(order => {
                return(
                order.orderItems.map(item =>{
                return(
                    <div key={item.documentId} className='account-single-order'>
                   <div className='account-single-order--column-1'>
                    <div className='account-line'><img src={item.picture} className="thumbnail" alt={`${item.title} front cover`}/></div>
                    </div>
                    <div className='account-single-order--column-2'>
                    <div className="account-line"><span className='order-category'>{t("order id")}: </span></div>
                    <div className='account-line'>{order.documentId}</div>
                    <div className="account-line"><span className='order-category'>{t("order date")}: </span></div>
                    <div className='account-line'>{date(order.orderCreatedDate)}</div>
                    <div className="account-line"><span className='order-category'>{t("order content")}: </span></div>
                    <div className='account-line'>{item.title}</div>
                    <div className="account-line"><span className='order-category'> x </span>{item.quantity}</div>
                    <div className="account-line"><span className='order-category'>{t("order total")}:</span> {order.orderTotal} €</div> 
                    <div className="account-line"><span className='order-category'>{t("shipping details")}:</span> {order.orderShipping} </div> 
                    </div>
                    </div>
                )
            }))}) : (
                <div>{t("You have no orders yet")}</div>
            )}
            </div>
            </div>
        </div>
    )
};

export default Admin;