import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItemsCount, selectCartTotal } from "../../redux/Cart/cart.selectors";
import { removeCartItem, addProduct, reduceCartItem } from "../../redux/Cart/cart.actions";
import { useTranslation } from "react-i18next";
import '../../translations/i18n';
import './styles.scss';

import close from '../../assets/icons/close.png';


const mapState = (state) => ({
   totalNumCartItems: selectCartItemsCount(state),
   cartItems: state.cartData.cartItems,
   total: selectCartTotal(state)
  })

const Cart = ({setCart, cart, addTransitionForCart}) => {

    const {totalNumCartItems, cartItems, total} = useSelector(mapState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {t} = useTranslation();

    const changeAmount = (action, product) => {
        if(action === '-'){
           dispatch(
               reduceCartItem(product)
           )
        } else {
            dispatch(
                addProduct(product)
            )

        }
    };

    const closeCart = (event) => {
        if(event.target.id === 'cart-background' || event.target.id === 'checkout-button'){
            setCart(!cart);
        }
      };
    
    const handleCheckout = (e) => {
        closeCart(e);
        navigate("/checkout")
    };

    const handleRemoveCartItem = (documentId) => {
        dispatch(
            removeCartItem({documentId})
        )
    }

    /**USEEFFECTS */

    useEffect(() => {
        cart && addTransitionForCart();
    }, []);


    useEffect(() =>{

    }, [cart]);

    return(
    <>
    <div id="cart-background" onClick={(e) => closeCart(e)}>
        <div className="cart-container">
            <div className="cart-header">
                <h1>{t("cart")}</h1>
                <div onClick={() => setCart(!cart)}>
                    <img src={close} alt="close button" className="cart-header--button"/>
                </div>
            </div>
            
            {cartItems.length > 0 ? 
            (<>
            {cartItems.map((item, index) => {
            return(
            <div key={item.documentId} className="cart-content">
            <div className="cart-items">
                <div className="cart-items--left">
                    <img alt={`${item.title} front cover`} onClick={() => navigate(`/record/${item.documentId}`)} src={item.picture && item.picture[0]} className="cart-items--left-picture"/>
                </div>
                <div className="cart-items--right">
                    <div>{item.title}</div>
                    <div>{item.price}€</div>
                    </div>
                </div>
                <div className="cart-items--right-quantity">
                        <div>
                            <button onClick={() => changeAmount('-', item)}>-</button> 
                            {item.quantity} 
                            <button onClick={() => changeAmount('+', item)}>+</button> 
                        </div>
                        <div><span className="cart-items--right-remove" onClick={() => handleRemoveCartItem(item.documentId)}>{t('remove')}</span></div>
                    </div>
             
            </div>
            )})}
               <div className="cart-header --total"><span>Total: {total}€</span></div>
                <div className="cart-header--span">{t("* means of payment include card and Paypal")}</div>
                <div className="checkout">
                <button id="checkout-button" onClick={(e) => handleCheckout(e)}>Checkout</button>
            </div>
            </>) : (
                <div className="cart-items">{t("You have no items in your cart")}</div>
            )}
        </div>
    </div>
    </>
    )
};

export default Cart;