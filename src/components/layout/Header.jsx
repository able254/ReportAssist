import React from 'react';
import logo from '../../assets/images/report-assist-logo.png';
import { supabase } from '@services/supabaseClient.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { GiPowerButton } from 'react-icons/gi';
import { FaRegUserCircle, FaUser } from 'react-icons/fa';
import './Header.css';

function Header() {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            // Force a full page load on sign-out so state is fully reset.
            window.location.href = '/signin';
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    return (
        <nav className="dash-header">
            <div className="logo-holder">
                <img className="logo" src={logo} alt="logo"/>
            </div>

            <div className="user-options-dropdown">
                <div className="user-options-holder">
                    <FaUser className="icon-user-options"/>
                </div>
                
                <div className="user-options-content">
                    <Link to="/account-settings" className="link-style">
                        <FaRegUserCircle className="icon-option" /> Account Settings
                    </Link>
                    <button className="btn-signout" onClick={handleSignOut}>
                        <GiPowerButton className="icon-option" /> Log Out
                    </button>
                </div>
            </div>  
        </nav>
    );
}

export default Header;