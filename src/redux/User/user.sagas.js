import userTypes from "./user.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  auth,
  handleUserProfile,
  getCurrentUser,
  signInWithGoogle,
  firestore
} from "../../firebase/utils";

import {
  signInSuccess,
  signOutUserSuccess,
  userError,
  resetPasswordSuccess,
  resetPasswordStart,
  modifyEmailSuccess
} from "./user.actions";

import { handleResetPasswordAPI } from "./user.helpers";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (error) {
    console.log(error)
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
      const { user } = yield auth.signInWithEmailAndPassword(email, password);
  yield getSnapshotFromUserAuth(user);
  } catch(error){
    yield put(userError(error.message));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    console.log(error)
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}
export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (error) {
    yield put(userError(error.message));
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch (error) {
    yield put (userError(error.message));
  }
}

export function* resetPassword({ payload: email }) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(resetPasswordSuccess());
  } catch (error) {
    yield put(userError(error.message));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* googleSignIn() {
  try {
    const { user } = yield signInWithGoogle();
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(userError(error.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* modifyEmail({payload: email}) {
  try {
    const userAuth = yield getCurrentUser();
    yield userAuth.updateEmail(email);
    yield put(modifyEmailSuccess());

  } catch(error){
    yield put (userError(error.message));
  }
}
export function* onModifyEmailStart() {
  yield takeLatest(userTypes.MODIFY_EMAIL_START, modifyEmail)
}
export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
    call(onModifyEmailStart),
  ]);
}
