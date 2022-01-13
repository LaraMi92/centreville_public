import axios from "axios";

export const checkUserIsAdmin = currentUser => {
    if(!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const {userRoles} = currentUser;
    if(userRoles.includes('admin')) return true;

    return false;
};

export const api = axios.create({
    baseURL: 'http://localhost:5001/centreville-94995/us-central1/api'
}
);