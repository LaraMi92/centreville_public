import React from "react";
import { Link } from "react-router-dom";
import './styles.scss';
import { useTranslation } from "react-i18next";
import '../../translations/i18n';

const AdminBar = () => {
    
    const {t} = useTranslation();

    return(
           <Link className="link" to="/admin">{t("Access to my Admin")}</Link>
    )
};

export default AdminBar;