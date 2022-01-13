import React from 'react';
import Links from './Links';
import logo from './../../assets/centreville50.svg';
import './styles.scss';


const Header = () => {
    return(
        <>
        <header className="header">
            <img className="header-logo"alt='centreville logo' src={logo}/>
        </header>
         <Links />
        </>    
     
    )
};

export default Header;