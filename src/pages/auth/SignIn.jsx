import React from 'react';
import './Auth.css'; 
import { Link } from 'react-router-dom';


//TO-DO: The Sign In form, unlike the Sign Up form is utilized by everyone, so therefore, it's crucial that it should support everyone utilizing it.
//TO-DO: Consider creating a Nav bar which navigates back to the original Landing Page/Home page
//TO-DO: Consider creating multiple html fragments which are put together to implement the page, that is, if it gets more complex.
function SignIn() {

    return (
        // Returns the Login Form
        <div className="page-container">
            <div className="form-container">
                
                <h1>Sign In to ReportAssist</h1>
                <h2>Enter your details below</h2>
                
                <form className="flex-form">
                    <div className="form-input">
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" required /> 
                    </div>
                    
                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    
                    {/*Button Section*/}
                    <div className='button-container'>
                        <button className="btn-signin" type="submit">Sign In</button>
                    </div>
                </form>

                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
        
};

export default SignIn;