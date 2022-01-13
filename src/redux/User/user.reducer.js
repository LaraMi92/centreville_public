
import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  userError: [],
  resetPasswordSuccess: false,
  modifyEmailSuccess: false,
  billingDetails: [],
  shippingDetails: []
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
        case userTypes.SIGN_IN_SUCCESS: 
          return {
            ...state,
            currentUser: action.payload,
            userError: []
          }
        case userTypes.SIGN_OUT_USER_SUCCESS:
          return {
            ...state,
            ...INITIAL_STATE
          }
        case userTypes.USER_ERROR:
            return {
              ...state,
              userError: action.payload
            }
        case userTypes.RESET_PASSWORD_SUCCESS:
          return {
            ...state,
            resetPasswordSuccess: action.payload
          }
        case userTypes.STORE_BILLING_DETAILS:
          return {
            ...state,
            billingDetails: action.payload
          }
          case userTypes.STORE_SHIPPING_DETAILS:
            return {
              ...state,
              shippingDetails: action.payload
            }
            case userTypes.MODIFY_EMAIL_SUCCESS:
              return {
                ...state,
                modifyEmailSuccess: true
              }
    default:
      return state;
  }
};

export default userReducer;
