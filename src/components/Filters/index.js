import React from "react";
import './styles.scss';
import { useTranslation } from "react-i18next";
import '../../translations/i18n';

const Filters = ({setFilter}) => {
    const {t} = useTranslation();

    return(
        <div className="filters">
            <button onClick={() => setFilter("")}>{t("all")}</button>
            <button onClick={() => setFilter("vinyl")}>vinyl</button>
            <button onClick={() => setFilter("cd")}>cd</button>
            <button onClick={() => setFilter("merchandising")}>merchandising</button>
        </div>
    )
};

export default Filters;