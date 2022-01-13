import React from "react";
import { useTranslation } from "react-i18next";
import '../../translations/i18n';
import './styles.scss';

import facebook from '../../assets/icons/facebook.svg';
import instagram from '../../assets/icons/instagram.svg';
import youtube from '../../assets/icons/youtube.svg';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const {t} = useTranslation();
    return(
        <footer className="footer">
            <div className="icons">
                <img className="icons-filter" alt="facebook icon" title="facebook" src={facebook} />
                <img className="icons-filter" alt="instagram icon" title="instagram" src={instagram} />
                <img className="icons-filter" alt="youtube icon" title="youtube" src={youtube} />
            </div>
            <div className="terms">
                <a href="#" className="terms--link">{t("terms of service")}</a>
                <span>© centreville {currentYear}</span>
            </div>
        </footer>
    )
};

export default Footer;