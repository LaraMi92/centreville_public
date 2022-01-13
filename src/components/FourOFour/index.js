import React from "react";
import { useTranslation } from "react-i18next";
import '../../translations/i18n';
import './styles.scss';

const FourOFour = () => {
    const {t} = useTranslation();
    return(
        <div className="four-o-four">
            <h2 className="four-o-four--h1">404</h2>
            <h2 className="four-o-four--h2">Oops. {t("Looks like you landed in the wrong place.")}</h2>
        </div>
    )
};

export default FourOFour;