import userTypes from "./user.types";

export const emailSignInStart = (credentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: credentials
});

export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION
})

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS
});

export const signUpUserStart = userCredentials => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials
});

export const userError = (error) => ({
  type: userTypes.USER_ERROR,
  payload: error
});

export const resetPasswordStart = userCredentials => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START
});

export const storeBillingDetails = (details) => ({
  type: userTypes.STORE_BILLING_DETAILS,
  payload: details
});

export const storeShippingDetails = (details) => ({
  type: userTypes.STORE_SHIPPING_DETAILS,
  payload: details
});

export const modifyEmail = (email) => ({
  type: userTypes.MODIFY_EMAIL_START,
  payload: email
});

export const modifyEmailSuccess = () => ({
  type: userTypes.MODIFY_EMAIL_SUCCESS
});

