import React from "react";
import './styles.scss';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";

const Breadcrumb = ({spanName}) => {

    const {t} = useTranslation();

    return(
        <div className="breadcrumb">
            <Link to="/checkout"><span className={spanName === 'breadcrumb-cart' ? spanName : undefined}>{t("cart")} </span>{'|'}</Link>
            <Link to="/billing"><span className={spanName === 'breadcrumb-billing' ? spanName : undefined}>{t("billing")} </span>{'|'}</Link>
            <Link to="/shipping"><span className={spanName === 'breadcrumb-shipping' ? spanName : undefined}>{t("shipping")} </span>{'|'}</Link>
            <Link to="/payment"><span className={spanName === 'breadcrumb-payment' ? spanName : undefined}>{t("payment")} </span></Link>
        </div>
    )
};

export default Breadcrumb;
