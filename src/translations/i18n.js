
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { translations_fr } from './fr/translations';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    resources: {
        fr: {
            translation: translations_fr,
        },
    }
});