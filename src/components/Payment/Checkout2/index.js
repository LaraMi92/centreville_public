import React, {useState} from "react";
import './styles.scss';
import { useNavigate } from "react-router-dom";
import { storeBillingDetails } from "../../../redux/User/user.actions";
import { useDispatch } from "react-redux";
import '../../../translations/i18n';

import AddressForm from "../../AddressForm";

const Checkout2 = () => {

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
            storeBillingDetails(formInput)
            );
        navigate('/shipping')

    }

    return(
        <AddressForm
        breadcrumbClassName={"breadcrumb-billing"}
        handleSubmit={handleSubmit}
        formInput={formInput}
        setFormInput={setFormInput}
        error={error}
        setError={setError}
        />
    )
};

export default Checkout2;