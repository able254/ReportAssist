import './Auth.css';
import { Link } from 'react-router-dom';

function SignUp () {
    return (
        <div className="page-container">
            <div className="form-container">
                
                <h1>Create a New Account</h1>
                <h2>Enter your details below</h2>

                <form className="flex-form">
                    <div className="form-input">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" required/>  
                    </div>

                    <div className="form-input">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last-name" name="last_name" required/>     
                    </div>

                    <div className="form-input">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" required/>     
                    </div>

                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>     
                    </div>

                    <div className="form-input">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" name="confirm_password" required/>     
                    </div>

                    <div className="form-input">
                        <label htmlFor="phone_number">Phone Number</label>
                        <input type="text" id="phone_number" name="phone_number" required/>     
                    </div>

                    <div className="form-input">
                        <label htmlFor="date_of_birth">Date of Birth</label>
                        <input type="date" id="date_of_birth" name="date_of_birth" required/>     
                    </div>

                    <div className="form-input">
                        <label htmlFor="gender">Gender</label>
                        <select className="form-drop-down" id="gender" name="gender">
                            <option value="">Select Your Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>   
                    </div>
                    
                    {/*Button Section*/}
                    <div className="button-container">
                        <button className="btn-reg">Back</button>
                        <button className="btn-reg">Next</button>
                        <button className="btn-reg">Sign Up</button>
                    </div>

                </form>

                <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            </div>
        </div>
    );
}

export default SignUp;