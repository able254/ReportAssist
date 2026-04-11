import React, { useEffect, useState } from 'react';
import { supabase } from '@services/supabaseClient.jsx';
import './Citizen.css';
import Header from '../../components/layout/Header.jsx';

function UserDashboard() {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const getUserProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('users')
                    .select('first_name')
                    .eq('id', user.id)
                    .single();
                
                if (data && !error) {
                    setFirstName(data.first_name);
                }
            }
        };
        getUserProfile();
    }, []);

    return (
        <>  
            <Header />

            <h1>Welcome, {firstName || 'User'}</h1>
            <h2>Make New Inquiry</h2>
            <h2>Report Crime</h2>
            <h2>Request for Case Information</h2>
            <h2>Request for a Meeting</h2>
            <h2>Chat With Police Officer</h2>
        </>
    );
};

export default UserDashboard;