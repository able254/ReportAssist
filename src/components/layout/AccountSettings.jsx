import React, { useState, useEffect } from "react";
import Header from "./Header";
import { supabase } from "../../services/supabaseClient";
import './AccountSettings.css';

function AccountSettings() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });
    
    // Store initial values to detect changes
    const [initialValues, setInitialValues] = useState({ email: '', phone: '' });

    // Fetch current user data on component mount
    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setEmail(user.email || '');

                // Fetch phone number from the public.users table instead of Auth
                const { data: profile } = await supabase
                    .from('users')
                    .select('phone_number')
                    .eq('id', user.id)
                    .maybeSingle();

                const userPhone = profile?.phone_number || '';
                setPhone(userPhone);
                setInitialValues({ email: user.email || '', phone: userPhone });
            }
        };
        getProfile();
    }, []);

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', content: '' });

        // 1. Password Validation
        if (password !== confirmPassword) {
            setMessage({ type: 'error', content: 'Passwords do not match.' });
            setLoading(false);
            return;
        }

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User session not found.");

            // 2. Build differential updates for Auth and Database
            const authUpdates = {};
            const profileUpdates = {};
            
            if (email !== initialValues.email) authUpdates.email = email;
            if (password) authUpdates.password = password;
            if (phone !== initialValues.phone) profileUpdates.phone_number = phone;

            // 3. Only submit if data has changed
            if (Object.keys(authUpdates).length === 0 && Object.keys(profileUpdates).length === 0) {
                setMessage({ type: 'info', content: 'No changes detected.' });
                setLoading(false);
                return;
            }

            // 4. Execute Auth updates (Email/Password)
            if (Object.keys(authUpdates).length > 0) {
                const { error: authError } = await supabase.auth.updateUser(authUpdates);
                if (authError) throw authError;
            }

            // 5. Execute Table updates (Phone Number)
            if (Object.keys(profileUpdates).length > 0) {
                const { error: profileError } = await supabase
                    .from('users')
                    .update(profileUpdates)
                    .eq('id', user.id);
                if (profileError) throw profileError;
            }

            // Update initial values after successful save
            setInitialValues({ email, phone });
            setPassword('');
            setConfirmPassword('');

            setMessage({ type: 'success', content: 'Account details updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', content: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmed) {
            // Account deletion usually requires a service role or a specific backend function 
            // due to security restrictions in client-side Supabase Auth.
            alert("Account deletion logic typically requires an edge function or admin API.");
        }
    };
    
    return(
        <>
            <Header />
            
            <div className="account-page-container">
                <h1>Account Settings</h1>
                <h2>Change your account details</h2>
                
                
                
                <form className="account-form" onSubmit={handleSaveChanges}>
                    
                    {message.content && (
                    <p className={`message ${message.type}`}>{message.content}</p>
                    )}

                    <h3 className="account-h3">Change your email address</h3>
                    <div className="form-input">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            className="account-details-input" 
                            type="email" id="email" name="email" 
                            value={email} onChange={(e) => setEmail(e.target.value)} 
                        />    
                    </div>
                    
                    <h3 className="account-h3">Change your phone number</h3>
                    <div className="form-input">
                        <label htmlFor="phone-number">Phone Number</label>
                        <input 
                            className="account-details-input" 
                            type="text" id="phone-number" name="phone-number" 
                            value={phone} onChange={(e) => setPhone(e.target.value)}
                        />    
                    </div>

                    <h3 className="account-h3">Change your password</h3>
                    <div className="form-input">
                        <label htmlFor="new-password">Enter your new password</label>
                        <input 
                            className="account-details-input" 
                            type="password" id="new-password" name="new-password" 
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-input">
                        <label htmlFor="confirm-password">Confirm your new password</label>
                        <input 
                            className="account-details-input" 
                            type="password" id="confirm-password" name="confirm-password" 
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-button">
                        <button className="btn-save-changes" type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                
                </form>

                <button className="btn-delete-account" onClick={handleDeleteAccount}>Delete Account</button>    
            </div>
        </>
    );
};

export default AccountSettings;