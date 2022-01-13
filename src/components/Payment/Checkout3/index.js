import React, {useState} from "react";
import './styles.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeShippingDetails } from "../../../redux/User/user.actions";
import { useTranslation } from "react-i18next";
import '../../../translations/i18n';

import AddressForm from "../../AddressForm";


const Checkout3 = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [formInput, setFormInput] = useState({
        name: '',
        line1: '',
        line2 : '',
        postal_code: '',
        city: '',
        country: '',
        state:''
    }); 
    
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formInput.name || !formInput.line1 || !formInput.postal_code 
            || !formInput.city || !formInput.country){
                setError(true);
                return;
            };
        dispatch(
            storeShippingDetails(formInput)
        )
        navigate('/payment')

    }

    return(
        <AddressForm
        breadcrumbClassName={"breadcrumb-shipping"}
        handleSubmit={handleSubmit}
        formInput={formInput}
        setFormInput={setFormInput}
        error={error}
        setError={setError}
        />
    )};

export default Checkout3;