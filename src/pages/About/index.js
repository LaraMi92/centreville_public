import React from "react";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import './styles.scss';

import logo from './../../assets/centreville15.svg';

const About = () => {
    const {t} = useTranslation();

    return(
        <div className="about">
            <img src={logo} alt="centreville logo" className="about--logo"/>
            <span className="about--text">{t("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim.")} </span>
        </div>
    )
};

export default About;