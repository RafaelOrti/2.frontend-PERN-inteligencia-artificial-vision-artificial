import React from 'react';
import {useNavigate} from 'react-router-dom';


import './Header.css';

const Header = () => {

    let navigate = useNavigate();

    return (
        <div className='designHeader<'>
            <div className="headerSpace"></div>
            <div className="headerSpace"></div>
            <div className="headerSpace linksDesign">
                <div className="link" onClick={()=>navegar("/login")}>Login</div>
                <div className="link" onClick={()=>navegar("/register")}>Registro</div>    
            </div>
        </div>
    )
}

export default Header;