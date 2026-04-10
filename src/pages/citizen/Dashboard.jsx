import logo from '../../assets/images/report-assist-logo.png';
import './Citizen.css';

{/*React Icons Imports*/}
import { GiPowerButton } from 'react-icons/gi';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

function UserDashboard() {
    return (
        <>  
            <nav className="dash-header">
                <div className="logo-holder">
                    <img className="logo" src={logo} alt="logo"/>
                </div>

                {/*Drop down menu for User-Options*/}                
                <div className="user-options-dropdown">
                    <div className="user-options-holder">
                        <FaUser className="icon-user-options"/>
                    </div>
                    
                    {/*Content for my drop down menu*/}
                    <div className="user-options-content">
                        <a><FaRegUserCircle/> Account Settings</a>
                        <a><GiPowerButton /> Log Out</a>
                    </div>

                </div>  
                
            </nav>

            <h1>Welcome, User</h1>
            <h2>Make New Inquiry</h2>
            <h2>Report Crime</h2>
            <h2>Request for Case Information</h2>
            <h2>Request for a Meeting</h2>
            <h2>Chat With Police Officer</h2>
        </>
    );
};

export default UserDashboard;