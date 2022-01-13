import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useTranslation } from 'react-i18next';

import "../../translations/i18n";
import './styles.scss';

import { checkUserIsAdmin } from '../../utils';

import { getUserOrderHistory } from '../../redux/Orders/orders.actions';
import { signOutUserStart} from "../../redux/User/user.actions";

import AdminBar from '../../components/AdminBar';
import SmallModal from '../../components/SmallModal';

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    orders: ordersData.orderHistory
  });

const date = (timestamp) => new Date(timestamp.seconds * 1000).toDateString();

const Account = () => {
    const dispatch = useDispatch();
    const {currentUser, orders} = useSelector(mapState);

    const logOut = () => {
        dispatch(signOutUserStart())
    }

    const {t} = useTranslation();

    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(
        getUserOrderHistory(currentUser.id)
        )
    }, []);

    return(
        <div className="account">
        <div className="account-details account-column">
            <h1>{t("Account Details")}</h1>
            {checkUserIsAdmin(currentUser) && 
            <div className="account-line">
                <AdminBar />
            </div>}
            <div className="account-line">{currentUser.displayName}</div>
            <div className="account-line">{currentUser.email}</div>
            <span onClick={() => setModal(true)} className="account-line account-link">{t("modify email?")}</span>
            <div className="account-line">{currentUser?.adress && currentUser.adress}</div>
            <button className="button account-button" onClick={() => logOut()}>{t('Logout')}</button>
            </div>
        <div className="account-orders account-column">
            <h1>{t("Orders History")}</h1>
            {orders?.data?.length > 0 ?
            orders.data.map(order => {
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
                    </div>
                    </div>
                )
            }))})
            
             : (
                <div>{t("You have no orders yet")}.</div>
            )}
           
        </div>
        {modal && 
        <SmallModal 
        setModal={setModal}
        currentUser={currentUser}
        text={"modify email?"}/>}
        </div>
    )
};



export default Account;