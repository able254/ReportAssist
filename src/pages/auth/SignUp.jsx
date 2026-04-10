import React, { useState, useRef } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';

/*Stores the code for the Registration Form*/
function RegistrationForm() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const formRef = useRef(null);

    /**
     * Handles all validation logic for the current step
     * - Checks empty fields via browser validation
     * - Checks password match for step 1
     */
    const validateCurrentStep = () => {
        if (!formRef.current) return false;

        // Get only inputs/selects in the CURRENT step
        const currentStepFields = formRef.current.querySelectorAll(
            step === 1
                ? '#first_name, #last_name, #email, #password, #confirm_password'
                : '#phone_number, #date_of_birth, #gender'
        );

        // Check for empty fields manually
        for (let field of currentStepFields) {
            if (!field.value) {
                setError('Please fill in all required fields.');
                field.focus(); // UX improvement
                return false;
            }
        }

        // Trigger native validation (email format, etc.)
        const isValid = formRef.current.reportValidity();
        if (!isValid) {
            setError('Please fill in all required fields.');
            return false;
        }

        // Password match validation (Step 1 only)
        if (step === 1) {
            const password = formRef.current.querySelector('#password')?.value;
            const confirmPassword = formRef.current.querySelector('#confirm_password')?.value;

            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return false;
            }
        }

        // Clear error if everything passes
        setError('');
        return true;
    };

    const nextStep = (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            setStep(2);
        }
    };

    const prevStep = (e) => {
        e.preventDefault();
        setStep(1);
    };

    return (
        <form className="flex-form" ref={formRef}>
            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/*Section One of the Registration Form*/}
            {step === 1 && (
                <div className="flex-form">
                    <div className="form-input">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" name="confirm_password" required />
                    </div>
                </div>
            )}

            {/*Section Two of the Registration Form*/}
            {step === 2 && (
                <div className="flex-form">
                    <div className="form-input">
                        <label htmlFor="phone_number">Phone Number</label>
                        <input type="text" id="phone_number" name="phone_number" required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="date_of_birth">Date of Birth</label>
                        <input type="date" id="date_of_birth" name="date_of_birth" required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="gender">Gender</label>
                        <select className="form-drop-down" id="gender" name="gender" required>
                            <option value="">Select Your Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
            )}

            {/*Button Section*/}
            <div className="button-container">
                {step === 2 && <button type="button" className="btn-reg" onClick={prevStep}>Back</button>}
                {step === 1 && <button type="button" className="btn-reg" onClick={nextStep}>Next</button>}
                {step === 2 && <button type="submit" className="btn-reg">Sign Up</button>}
            </div>
        </form>
    );
}

/*Renders the SignUp form and high-level html elements*/
function SignUp() {
    return (
        <div className="page-container">
            <div className="form-container">
                <h1>Create a New Account</h1>
                <h2>Enter your details below</h2>
                <RegistrationForm />
                <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            </div>
        </div>
    );
}

export default SignUp;