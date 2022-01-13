/**PACKAGES */
import React, {useEffect} from "react";
import {Route, Routes, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

/**ACTIONS */
import { checkUserSession } from "./redux/User/user.actions";

/**HOC */
import WithAuth from "./HOC/withAuth";
import WithAdminAuth from "./HOC/withAdminAuth";

/**COMPONENTS */
import Header from './components/Header';
import Checkout1 from "./components/Payment/Checkout1";
import Cart from './components/Cart';
import FourOFour from "./components/FourOFour";
import Footer from "./components/Footer";
import AdminBar from "./components/AdminBar";

/**PAGES */
import Homepage from "./pages/Homepage";
import RecordDetail from "./pages/RecordDetail";
import SignInUp from "./pages/SignInUp";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ForgottenPassword from "./pages/ForgottenPassword";
import Admin from "./pages/Admin";
import OrderCheckout from "./pages/OrderCheckout";
import OrderBilling from "./pages/OrderBilling";
import OrderShipping from "./pages/OrderShipping";
import OrderPayment from "./pages/OrderPayment";

/**STYLES */
import './default.scss';


const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  shipping: user.shippingDetails,
  billing: user.billingDetails
});

const App = () => {

  const {currentUser, shipping, billing} = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, []);

  return (
    <div className="app-container">
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/record/:productId" element={<RecordDetail />} />
          <Route path="/registration" element={currentUser ? <Navigate to="/" /> : <SignInUp />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <SignInUp />} />
          <Route path="/account" element={<WithAuth><Account /></WithAuth>} />
          {!currentUser && <Route path="/recovery" element={<ForgottenPassword />} />}
          <Route path="/admin" element={<WithAdminAuth><Admin /></WithAdminAuth>} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path='/checkout' element={<WithAuth><OrderCheckout /></WithAuth>} />
          <Route path="/billing" element={<WithAuth><OrderBilling /></WithAuth>} />
          <Route path="/shipping" element={<WithAuth><OrderShipping /></WithAuth>} />
          <Route path="/payment" element={<WithAuth><OrderPayment /></WithAuth>} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
