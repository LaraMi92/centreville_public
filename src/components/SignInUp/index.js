/**PACKAGES */
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useLocation} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import '../../translations/i18n';

/**STYLES */
import "./styles.scss";

/**ACTIONS */
import { emailSignInStart, signUpUserStart, googleSignInStart } from "./../../redux/User/user.actions";
import userTypes from "../../redux/User/user.types";


const mapState = ({user}) => ({
  currentUser: user.currentUser,
  signInSuccess: user.signInSuccess,
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
  userError: user.userError
})

const SignInUp = () => {
  const path = useLocation().pathname;

  const dispatch = useDispatch();
  const { signUpSuccess, userError, currentUser} = useSelector(mapState);

  const {t} = useTranslation();

  /**HOOKS*/
  const [formInputs, setFormInputs] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
 const [error, setError] = useState('');
 const errors = [`Passwords don't match!`, `Please provide a name!`, `Please provide a valid email!`, `Please provide a valid password!`]
  
  useEffect(() => {
    if(/* path === "/registration" && */ userError.length > 0){
      setError(userError);
    }
  }, [userError]); 


  useEffect(() => {
    if(currentUser || signUpSuccess){
      setFormInputs({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    }
  }, [currentUser, signUpSuccess])

  

  /**API CALLS */
  const signIngoogle = () => dispatch(googleSignInStart());

  const handleFormSubmit = (e, signInOrUp) => {
    e.preventDefault();
    const {displayName, email, password, confirmPassword} = formInputs;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(signInOrUp === 'signUp') {
      
      if(password !== confirmPassword){
        dispatch({
          type: userTypes.USER_ERROR,
          payload: errors[0]
        })
        return;
      }
      if(displayName.length === 0){
        dispatch({
          type: userTypes.USER_ERROR,
          payload: errors[1]
        })
        return;
      }
      if(email.length <= 5 || !regex.test(email)){
        dispatch({
          type: userTypes.USER_ERROR,
          payload: errors[2]
        })
        return;
      }
      if(password.length <= 5 ){
        dispatch({
          type: userTypes.USER_ERROR,
          payload: errors[3]
        })
        return; 
      }
      
      dispatch(signUpUserStart({
        displayName,
        email,
        password
      }));
    }
   
    if(signInOrUp === 'signIn'){
      dispatch(emailSignInStart({email, password}))
    }
  
  };

  /**HANDLER */
  const handleChange = (name, value) => {
    setFormInputs({
      ...formInputs, 
      [name]: value});
    setError('');
  };


  return (
    <>
      <form
        onSubmit={
          path === "/registration"
            ? (e) => handleFormSubmit(e, "signUp")
            : (e) => handleFormSubmit(e, "signIn")
        }
        className="sign-in-up"
      >
        {path === "/registration" ? <h1>{t("Sign Up")}</h1> : <h1>{t("Sign In")}</h1>}
        {path === "/login" && (<Link to="/registration" className="sign-in-up--user-register">{t("No account yet? Register here")}</Link>)}
        {path === "/registration" && (
          <div className="sign-in-up--data">
            <div className="sign-in-up--infos-name">
              <label htmlFor="displayName">{t("name")} *</label>
              <input
                type="text"
                required
                name="displayName"
                value={formInputs.displayName}
                className="input"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="sign-in-up--data">
          <div className="sign-in-up--infos-name">
            <label htmlFor="email">Email* </label>
            <input
              type="email"
              required
              name="email"
              value={formInputs.email}
              className="input"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="sign-in-up--infos-name">
            <label htmlFor="password">{t("password")}*</label>
            <input
              type="password"
              required
              name="password"
              value={formInputs.password}
              className="input"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
             {path === "/login" && (<Link to="/recovery" className="forgot">{t("Forgot password")}?</Link>)}
          </div>

          {path === "/registration" && (
            <div className="sign-in-up--infos-name">
              <label htmlFor="confirmPassword">{t("confirm password")}*</label>
              <input
                type="password"
                required
                name="confirmPassword"
                className="input"
                value={formInputs.confirmPassword}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
          )}

          {error !== '' && (
            <div className="sign-in-up--infos-error">{t(error)}</div>
          )}
         </div>
        
        {path === "/registration" ? (
          <button type="submit" className="send-login">
            {t("Sign Up")}
          </button>
        ) : (
          <button type="submit" className="send-login">
            {t("Sign In")}
          </button>
        )}
      </form>
      <div className="sign-in-up">
        {path === "/login" && (
          <button className="send-login" onClick={() => signIngoogle()}>
            {t("sign in with Google")}
          </button>
        )}
      </div>
    </>
  );
};

export default SignInUp;
