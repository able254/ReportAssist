import React, { useState } from 'react';
import './Auth.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@services/supabaseClient.jsx';

//TO-DO: The Sign In form, unlike the Sign Up form is utilized by everyone, so therefore, it's crucial that it should support everyone utilizing it.
//TO-DO: Consider creating a Nav bar which navigates back to the original Landing Page/Home page
//TO-DO: Consider creating multiple html fragments which are put together to implement the page, that is, if it gets more complex.
function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Sign in with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            // 2. Fetch the role_id from the public.users table
            console.log("Auth successful. Fetching profile for UUID:", authData.user.id);

            const { data: profile, error: profileError } = await supabase
                .from('users')
                .select('role_id, first_name')
                .eq('id', authData.user.id)
                .maybeSingle();

            console.log("Step 2 result:", { profile, profileError });

            if (profileError) throw profileError;

            if (!profile) {
                setError('Login successful, but no user profile was found. Please check if your account was created correctly.');
                setLoading(false);
                return;
            }

            // 3. Route based on role_id
            const role = Number(profile.role_id); 
            console.log("Step 3 Redirection. Routing for Role:", role);

            // 1: citizen, 2: triage officer, 3: police officer, 4: system admin
            switch (role) {
                case 1:
                    console.log("Navigating to Citizen Dashboard");
                    navigate('/user/dashboard');
                    break;
                case 2:
                    console.log("Navigating to Triage Dashboard");
                    navigate('/triage/dashboard');
                    break;
                case 3:
                    console.log("Navigating to Officer Dashboard");
                    navigate('/officer/dashboard');
                    break;
                case 4:
                    console.log("Navigating to Admin Dashboard");
                    navigate('/admin/dashboard');
                    break;
                default:
                    setError('Invalid role assignment.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        // Returns the Login Form
        <div className="page-container">
            <div className="form-container">
                
                <h1>Sign In to ReportAssist</h1>
                <h2>Enter your details below</h2>
                
                {error && <p className="error-message">{error}</p>}

                <form className="flex-form" onSubmit={handleSignIn}>
                    <div className="form-input">
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> 
                    </div>
                    
                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    
                    {/*Button Section*/}
                    <div className='button-container'>
                        <button className="btn-signin" type="submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>

                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
        
};

export default SignIn;