import { auth } from "../../firebase/utils";

export const handleResetPasswordAPI = (email) => {
    const config = {
        //REDIRECTED TO AFTER PW HAS BEEN RESET
        url: "http://localhost:3000/login",
      };
  
    return new Promise((resolve, reject) => {
        auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        });
    })
}