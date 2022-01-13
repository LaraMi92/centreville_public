import React, {useState, useEffect} from "react";
import "../../translations/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import close from '../../assets/icons/close.png';
import './styles.scss';

import {modifyEmail } from "../../redux/User/user.actions";
import { deleteProductStart } from "../../redux/Products/products.actions";

const mapState = ({user}) => ({
  userError: user.userError,
  emailModified: user.modifyEmailSuccess
});

const SmallModal = ({setModal, text, currentUser, item}) => {

    const {t} = useTranslation();
    const {userError, emailModified} = useSelector(mapState);
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const closeModal = (event) => {
      if (event.target.id === "modal-background") {
        setModal(false);
      }
    };

    const submitForm = (e) => {
      e.preventDefault();
      if (text === "modify email?") {
        if (regex.test(input) && currentUser.email !== input) {
          dispatch(modifyEmail(input));
        } else {
          setError("Please provide a valid email!");
        }
      }
      if(text === "Are you sure you want to delete this item?"){
        dispatch(deleteProductStart(item));
        setModal(false);
      }
    };

    useEffect(() => {

    }, [error, userError]);

    return (
      <form onSubmit={submitForm} id="modal-background" onClick={(e) => closeModal(e)}>
        <div className="modal-overlay">
          <div className="small-modal">
            <div className="small-modal--close">
              <img src={close} alt="close" onClick={() => setModal(false)} className="cart-header--button" />
            </div>
            <div className="small-modal--text">
                <h3>{t(text)}</h3>
            </div>
            <div>
            {text === "modify email?" && (<input className="input" onChange={(e) => setInput(e.target.value)} value={input} />)}
            </div>
            {error !== "" && <div className="small-modal--error error">{t(error)}</div>}
            {userError.length > 0 && <div className="small-modal--error error">{userError}</div>}
            {text === "modify email?" && emailModified ? (<div className="small-modal--success">{t("Your email address was updated")}</div>) : undefined}
            <div className="small-modal--buttons">
              <button className="button" onClick={(e) => submitForm(e)}>{t("confirm")}</button>
              <button className="button" onClick={() => setModal(false)}>{t("cancel")}</button>
            </div>
          </div>
        </div>
      </form>
    );
};

export default SmallModal;