import React from "react";
import './styles.scss';
import Breadcrumb from "../Breadcrumb";
import {CountryDropdown} from 'react-country-region-selector';
import { useTranslation } from "react-i18next";
import '../../translations/i18n';

const AddressForm = ({breadcrumbClassName, handleSubmit, formInput, setFormInput, error, setError}) => {


    const {t} = useTranslation();

    const handleChange = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value
        });
        setError(false);
    }

    return(
        <>
        <Breadcrumb spanName={breadcrumbClassName} />
        <form className="checkout-2">
            <div className="checkout-2-line">
                <label htmlFor="name">{t("name (as specified on card detail)")}*</label>
                <input type="text" 
                name="name" 
                required
                value={formInput.name} 
                className="input" 
                onChange={(e) => handleChange(e.target.name, e.target.value)} 
                />
            </div>
            <div className="checkout-2-line">
                <label htmlFor="line1">{t("address")} *</label>
                <input type="text" 
                name="line1" 
                required
                value={formInput.line1} 
                className="input" 
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <label htmlFor="line2">{t("complementary address")}</label>
                <input type="text" 
                name="line2" 
                required
                value={formInput.line2} 
                className="input" 
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
            </div>
            <div className="checkout-2-line">
                <label htmlFor="postal_code">{t("postal code")} *</label>
                <input type="text" 
                name="postal_code" 
                required
                value={formInput.postal_code} 
                className="input" 
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
            </div>
            <div className="checkout-2-line">
                <label htmlFor="city">{t("town/city")} *</label>
                <input type="text" 
                name="city" 
                value={formInput.city} 
                required
                className="input" 
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
            </div>
            <div className="checkout-2-line">
                <label htmlFor="state">{t("region/province")}</label>
                <input type="text" 
                name="state" 
                required
                value={formInput.state} 
                className="input" 
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
            </div>
            <div className="checkout-2-line">
                <label htmlFor="country">{t("country")} *</label>
                <div className="checkout--billing">
                <CountryDropdown
                required
                value={formInput.country}
                name='country'
                valueType='short'
                onChange={(value) => handleChange('country', value)} 
                />
        </div>
            </div>
            {error && <div className="checkout-2-line error">{t("Please fill in required fields")}</div>}
            <button className="checkout-1-button" onClick={(e) => handleSubmit(e)}>{t("proceed to shipping")}</button>
        </form>
        </>
      
    )
};

export default AddressForm;