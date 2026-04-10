import React, { useState } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import { registerUser } from '../../lib/registerUser';

/* Registration Form Component */
function RegistrationForm() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        date_of_birth: '',
        gender: ''
    });

    /* Handles input changes */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Pure validation logic decoupled from component state.
     * Returns an error message string if invalid, or null if valid.
     */
    const getValidationError = (currentStep, data) => {
        const stepFields = {
            1: ['first_name', 'last_name', 'email', 'password', 'confirm_password'],
            2: ['phone_number', 'date_of_birth', 'gender']
        };

        // 1. Check for empty fields
        const hasEmptyFields = stepFields[currentStep].some(field => !data[field]?.trim());
        if (hasEmptyFields) {
            return 'Please fill in all required fields.';
        }

        // 2. Cross-field validation (Step 1 only)
        if (currentStep === 1 && data.password !== data.confirm_password) {
            return 'Passwords do not match.';
        }

        return null;
    };

    /* Wrapper to handle state updates */
    const validateCurrentStep = () => {
        const validationMessage = getValidationError(step, formData);
        if (validationMessage) {
            setError(validationMessage);
            return false;
        }
        setError('');
        return true;
    };

    /* Navigation */
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

    /* Final submission */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateCurrentStep()) return;
        
        {/*Uses Object Destructuring to remove the confirm_password property. Crucial for the next step*/}
        const { confirm_password, ...cleanData } = formData;
        {/*Add the role_id. Very important for database compatibility etc*/}
        const enrichedData = { ...cleanData, role_id: 1 };
        
        {/*Test. Paste data in the console*/}
        console.log('Final Data:', enrichedData);

        // TODO: Send cleanData to backend (e.g., Supabase)
        const result = await registerUser(enrichedData);
        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <form className="flex-form" onSubmit={handleSubmit}>
            
            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Step 1 */}
            {step === 1 && (
                <div className="flex-form">
                    <div className="form-input">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                    </div>

                    <div className="form-input">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                    </div>

                    <div className="form-input">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="form-input">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
                    </div>
                </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <div className="flex-form">
                    <div className="form-input">
                        <label htmlFor="phone_number">Phone Number</label>
                        <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                    </div>

                    <div className="form-input">
                        <label htmlFor="date_of_birth">Date of Birth</label>
                        <input type="date" id="date_of_birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
                    </div>

                    <div className="form-input">
                        <label htmlFor="gender">Gender</label>
                        <select className="form-drop-down" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Your Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Button Section */}
            <div className="button-container">
                {step === 2 && (<button type="button" className="btn-reg" onClick={prevStep}>Back</button>)}
                {step === 1 && (<button type="button" className="btn-reg" onClick={nextStep}>Next</button>)}
                {step === 2 && (<button type="submit" className="btn-reg">Sign Up</button>)}
            </div>

        </form>
    );
}

/* Page Wrapper */
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