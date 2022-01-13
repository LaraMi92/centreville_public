import React, {useState, useRef} from "react";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import './styles.scss';
import emailJsConfig from "../../emailjs/emailJsConfig";
import emailjs from "emailjs-com";


const Contact = () => {
    const {t} = useTranslation();

    const [formInput, setFormInput] = useState({
        name: '',
        email: '',
        message: ''
    });
    const form = useRef();

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleChange = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value
        });
        setError(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formInput.name || !formInput.email || !formInput.message){
            setError('Please fill in required fields');
            return;
        };

        emailjs.sendForm('default_service', emailJsConfig.templateId, form.current, emailJsConfig.userId)
        .then((result) => {
            setSuccess(true);
        }, (error) => {
            setError(`There was an error sending your message: ${error.text}`);
        })
    };

    return(
        <form ref={form} onSubmit={(e) => handleSubmit(e)} className="contact">
            <h1>{t("Reach out to us and we'll be in touch")}</h1>
            <div className="contact--infos">
                <div className="contact--infos-name">
                    <label htmlFor="name">{t("name")}*</label>
                    <input type="text" label="name" name="name" className="input" onChange={(e) => handleChange(e.target.name, e.target.value)}/>
                </div>
                <div className="contact--infos-email">
                <label htmlFor="email">Email*</label>
                    <input type="email" label="email" name="email" className="input" onChange={(e) => handleChange(e.target.name, e.target.value)}/>
                </div>
            </div>
            <div className="contact--message">
            <label htmlFor="message">Message*</label>
                <textarea label="message" name="message" className="input" onChange={(e) => handleChange(e.target.name, e.target.value)}/>
            </div>
            <div className="contact--send">
                <button onClick={(e) => handleSubmit(e)}>{t("Send")}</button>
            </div>
            {error.length > 0 && <div className="contact error">{t(error)}</div>}
            {success && <div className="contact">{t("Your message was sent")}</div>}
        </form>
    )
};

export default Contact;