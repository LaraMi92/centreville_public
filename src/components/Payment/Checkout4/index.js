import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";

import "../../../translations/i18n";
import './styles.scss';

import Breadcrumb from "../../Breadcrumb";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { selectCartTotal, selectCartItemsCount, selectCartItems } from "../../../redux/Cart/cart.selectors";

import { saveOrderHistory } from "../../../redux/Orders/orders.actions";
import { api } from "../../../utils";

/**STRUCTURED SELECTOR */
const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems
});

/**SELECTOR */
const mapStateDetails = ({user}) => ({
    billingDetails: user.billingDetails,
    shippingDetails: user.shippingDetails
});


const Checkout4 = () => {
    /**HOOKS */
    const navigate = useNavigate();
    const elements = useElements();
    const stripe = useStripe();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const [successPayment, setSuccessPayment] = useState(false);
    const [cardEl, setCardEl] = useState(false);
    const [payPal, setPayPal] = useState(false);
    const [error, setError] = useState(false);

    const PayPalButton = window.paypal.Buttons.driver("react", {React, ReactDOM});

    const {total, itemCount, cartItems} = useSelector(mapState);
    const {billingDetails, shippingDetails} = useSelector(mapStateDetails);
    const name = shippingDetails.name;
    const billingName = billingDetails.name;


    const checkIfNull = (obj) => Object.values(obj).every(value => {
        if(value == null || value === ""){
            return true;
        };
        return false;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkIfNull(billingDetails) === true || checkIfNull(shippingDetails) === true){
            setError(true);
            return;
        };

        delete shippingDetails.name;
        delete billingDetails.name;

        const cardElement = elements.getElement(CardElement);

        api.post('/payments/create', {
            amount: total * 100,
            shipping: {
                name,
                address: {
                    ...shippingDetails
                }
            }
        }).then(({data: clientSecret}) => {
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: billingName,
                    address: {
                        ...billingDetails
                    }
                }
            }).then(({paymentMethod}) => {
                stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                })
                .then(({paymentIntent}) => {
                    const order = {
                        orderTotal: total,
                        orderShipping: shippingDetails,
                        orderItems: cartItems.map(item => {
                            const {documentId, title, picture, price, quantity} = item;
                            return {
                                documentId, title, picture, price, quantity
                            }
                        })
                    }
                    dispatch(
                        saveOrderHistory(order)
                    )
                    setSuccessPayment(true)
                })
            })
        })
    

    };

    const configCardElement = {
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    };

    const createOrder = (data, actions) =>{
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total,
              },
            },
          ]
        });
      };
    
      const onApprove = async (data, actions) => {
         let Order = await actions.order.capture()
         .then((payload) => {
            const order = {
                orderTotal: total,
                orderShipping: shippingDetails,
                orderItems: cartItems.map(item => {
                    const {documentId, title, picture, price, quantity} = item;
                    return {
                        documentId, title, picture, price, quantity
                    }
                })
            }
            dispatch(
                saveOrderHistory(order)
            )
            setSuccessPayment(true)
          })
         return Order;
      };

    useEffect(() => {
        if(itemCount < 1){
            setTimeout(() => {
                navigate('/account')
            }, 5000)
        }
    }, [itemCount])

    return (
      <>
        <Breadcrumb spanName="breadcrumb-payment" />
        <div className="payment--card">
            <button className="button" onClick={() => {
                setCardEl(!cardEl)
                setPayPal(false)}}>Pay by card</button>
            <button className="button" onClick={() => {
                setPayPal(!payPal)
                setCardEl(false)}}>Pay using PayPal</button>
           {payPal && (
                <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onError={(error) => setError(true)}
              />)}
           
          {cardEl && (
            <>
          <CardElement className="payment--card-element" options={configCardElement} />
          <button className="button" onClick={(e) => handleSubmit(e)}> {t("pay now")}
          </button>
          </>)}
        </div>
        <div className="payment--card">
          {successPayment &&
          (
            <div>{t("Your payment was successful, wait for redirection")}</div>
          )}
          {error && <div className="error">{t("Please complete all previous required fields.")}</div>}
        </div>
      </>
    );
};

export default Checkout4;
