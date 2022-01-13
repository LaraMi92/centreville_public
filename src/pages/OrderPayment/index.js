import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { publishableKey } from "../../stripe/config";

import Checkout4 from "../../components/Payment/Checkout4";

const OrderPayment = () => {
    const stripePromise = loadStripe(publishableKey);

    return(
        <Elements stripe={stripePromise}>
        <Checkout4 />
        </Elements>
    );
};

export default OrderPayment;