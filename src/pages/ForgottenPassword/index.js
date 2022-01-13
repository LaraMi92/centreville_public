import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import '../../translations/i18n';
import "./styles.scss";
import { resetPasswordStart } from "../../redux/User/user.actions";

const mapState = ({user}) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userError: user.userError
});

const ForgottenPassword = () => {

  const {t} = useTranslation();

  const {resetPasswordSuccess, userError} = useSelector(mapState);
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState({
    email: "",
  });
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const location = useLocation();
  
  const handleChange = (name, value) => {
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
    setError("");
    setSuccess(false);
  };

  const sendReset = (e) => {
    e.preventDefault();
    if (formInputs.email.length <= 5 || !regex.test(formInputs.email)) {
      setError(`Please provide a valid email!`);
      return;
    }
      dispatch(resetPasswordStart(formInputs.email));
  };

  useEffect(() => {
    if(resetPasswordSuccess){
      setSuccess(true);
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if(userError.length > 0){
      setError(userError);
    }
  }, [userError])

  return (
    <form onSubmit={(e) => sendReset(e)} className="sign-in-up">
      <h1>{t("Forgot password")}?</h1>
      <div className="sign-in-up--data">
        <div className="sign-in-up--infos-name">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            label="email"
            name="email"
            value={formInputs.email}
            className="input"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      {error !== "" && <div className="sign-in-up--infos-error">{error}</div>}

      <button className="send-login" onSubmit={(e) => sendReset(e)}>
        {t("Reset password")}
      </button>

      {success && (
        <>
        <div className="sign-in-up--infos-success">
          {t("An email was sent to you")}
        </div>
        <Navigate to="/login" state={{ from: location }} />
        </>
      )}
    </form>
  );
};

export default ForgottenPassword;
