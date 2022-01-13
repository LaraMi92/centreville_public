import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import {Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import '../../../translations/i18n';

import { signOutUserStart} from "../../../redux/User/user.actions";
import { selectCartItemsCount } from "../../../redux/Cart/cart.selectors";

import Cart from '../../Cart';
import Checkout1 from "../../Payment/Checkout1";
import Checkout2 from "../../Payment/Checkout2";
import Checkout3 from "../../Payment/Checkout3";
import Checkout4 from "../../Payment/Checkout4";

import user from '../../../assets/icons/user_account.png';
import cartIcon from '../../../assets/icons/cart.png';



const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
  });

const Links = () => {

    const {t} = useTranslation();

    const {currentUser, totalNumCartItems} = useSelector(mapState);
    const dispatch = useDispatch();

    const [cart, setCart] = useState(false);

    const logOut = () => {
        dispatch(signOutUserStart())
    }

    const addTransitionForCart = () => {
        document.querySelector('.cart-container').classList.add('transition');
    };

    useEffect(() => {
    }, [currentUser, cart]);

    return(
        <>
        <div className="sticky-menu">
            <div className="language-switch">
                <button onClick={() => changeLanguage("en")}>EN</button>|<button onClick={() => changeLanguage("fr")}>FR</button>
            </div>
            <div className="links">
                <Link to="/">shop</Link>
                <Link to='/about'>{t('about')}</Link>
                <Link to='/contact'>contact</Link>
            </div>
            <>
                {!currentUser && (
                <div className="user-info">
                <button><Link to="/login" className="user-info--login">{t("Login")}</Link></button>
                <button className="user-info--icon"><img title="cart" alt="cart" src={cartIcon} onClick={() => setCart(!cart)}/>({totalNumCartItems})</button> 
                </div>)}
                {currentUser && (
                <div className="user-info">
                <button className="user-info--login" onClick={() => logOut()}>{t('Logout')}</button>
                <button><Link to="/account"><img title={t("user account")} alt="user icon" src={user} className="user-info--icon"/></Link></button>
                <button className="user-info--icon" onClick={() => setCart(!cart)}><img title={t("cart")} alt="cart" src={cartIcon}/>({totalNumCartItems})</button> 
                </div>)}
             </>
         </div>
         {cart && <Cart 
         setCart={setCart} 
         cart={cart}
         addTransitionForCart={addTransitionForCart} 
         />}
         </>
    )
};

export default Links;