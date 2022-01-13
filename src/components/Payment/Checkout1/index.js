import React from "react";
import './styles.scss';
import { selectCartTotal } from "../../../redux/Cart/cart.selectors";
import { useSelector, useDispatch } from "react-redux";
import { removeCartItem, addProduct, reduceCartItem } from "../../../redux/Cart/cart.actions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../../../translations/i18n';

import Breadcrumb from "../../Breadcrumb";

const mapState = (state) => ({
    cartItems: state.cartData.cartItems,
    total: selectCartTotal(state)
   });

const Checkout1 = () => {
    const {cartItems, total} = useSelector(mapState);
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

    const handleRemoveCartItem = (documentId) => {
        dispatch(
            removeCartItem({documentId})
        )
    };

    return (
      <>
        <Breadcrumb spanName={"breadcrumb-cart"} />
        <div className="checkout-1">
          {cartItems.map((item) => {
            return (
              <div key={item.documentId} className="cart-items">
                <div className="cart-items--left">
                  <img
                    alt="album cover"
                    src={item.picture && item.picture[0]}
                    className="cart-items--left-picture"
                  />
                </div>
                <div className="cart-items--right">
                  <div>{item.title}</div>
                  <div>{item.price}€</div>
                  <div className="cart-items--right-quantity">
                    <div>
                      <button onClick={() => changeAmount("-", item)}>-</button>
                      {item.quantity}
                      <button onClick={() => changeAmount("+", item)}>+</button>
                    </div>
                    <div>
                      <span
                        onClick={() => handleRemoveCartItem(item.documentId)}
                      >
                        {t("remove")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-header --total">Total: {total}€</div>
        <button
          className="checkout-1 checkout-1-button"
          onClick={() => navigate("/billing")}
        >
          {t("proceed to billing")}
        </button>
      </>
    );
};

export default Checkout1;