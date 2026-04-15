import React, { useEffect, useState } from 'react';
import { supabase } from '@services/supabaseClient';
import './Citizen.css';
import Header from '../../components/layout/Header';
import BotpressChat from '../../services/BotPressChat';

import { MdSpaceDashboard } from 'react-icons/md';
import { IoIosChatbubbles } from 'react-icons/io';
import { TbReport } from 'react-icons/tb';
import { FaBriefcase } from 'react-icons/fa';
import MyReports from '../../components/functions/citizen/MyReports';
import CaseRequests from '../../components/functions/citizen/CaseRequests';
import Chats from '../../components/functions/citizen/Chats';

function UserDashboard() {
    const [firstName, setFirstName] = useState('');
    const [activeView, setActiveView] = useState('dashboard');

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

            <div className="main-container">

                {/*Sidebar Content*/}
                <div className="citizen-sidebar">
                    
                    <div className={`sidebar-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>
                        <MdSpaceDashboard className="icon-sidebar" /><p className="text-sidebar">Dashboard</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'my-reports' ? 'active' : ''}`} onClick={() => setActiveView('my-reports')}>
                        <TbReport className="icon-sidebar" /><p className="text-sidebar">My Reports</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'case-requests' ? 'active' : ''}`} onClick={() => setActiveView('case-requests')}>
                        <FaBriefcase className="icon-sidebar" /><p className="text-sidebar">Case Requests</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'chats' ? 'active' : ''}`} onClick={() => setActiveView('chats')}>
                        <IoIosChatbubbles className="icon-sidebar" /><p className="text-sidebar">Chats</p>    
                    </div>
                    
                </div>

                {/*Main Content*/}
                <div className="main-content">
                    {activeView === 'dashboard' && (
                        <>
                            <h1>Welcome, {firstName || 'User'}</h1>

                            {/*Features: TO-DO*/}
                            {/*<h2>Make New Inquiry</h2>
                            <h2>Report Crime</h2>
                            <h2>Request for Case Information</h2>
                            <h2>Request for a Meeting</h2>
                            <h2>Chat With Police Officer</h2>*/}
                        </>
                    )}
                    {activeView === 'my-reports' && <MyReports />}
                    {activeView === 'case-requests' && <CaseRequests />}
                    {activeView === 'chats' && <Chats />}
                </div>

            </div>

            <BotpressChat />

        </>
    );
};

export default UserDashboard;