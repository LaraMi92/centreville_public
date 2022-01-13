import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkUserIsAdmin } from '../utils';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const useAdminAuth = () => {
    const {currentUser} = useSelector(mapState);
    const navigate = useNavigate();

    useEffect(() => {
        if(!checkUserIsAdmin(currentUser)){
            navigate('/login');
        }
    }, [currentUser]);

   
    return currentUser;
};

export default useAdminAuth;