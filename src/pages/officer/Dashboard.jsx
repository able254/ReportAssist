import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import './Officer.css';

import { MdSpaceDashboard } from 'react-icons/md';
import { IoIosChatbubbles } from 'react-icons/io';
import { FaCalendar } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import OfficerMyCases from '../../components/functions/officer/OfficerCases';
import OfficerChats from '../../components/functions/officer/OfficerChats';
import OfficerMeetings from '../../components/functions/officer/OfficerMeetings';

function OfficerDashboard() {
    const [activeView, setActiveView] = useState('dashboard');

    return (
        <>
            <Header/>

            <div className="main-container">

                {/*Sidebar Content*/}
                <div className="officer-sidebar">
                    
                    <div className={`sidebar-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>
                        <MdSpaceDashboard className="icon-sidebar" /><p className="text-sidebar">Dashboard</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'my-cases' ? 'active' : ''}`} onClick={() => setActiveView('my-cases')}>
                        <IoIosDocument className="icon-sidebar" /><p className="text-sidebar">Cases</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'chats' ? 'active' : ''}`} onClick={() => setActiveView('chats')}>
                        <IoIosChatbubbles className="icon-sidebar" /><p className="text-sidebar">Chats</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'meetings' ? 'active' : ''}`} onClick={() => setActiveView('meetings')}>
                        <FaCalendar className="icon-sidebar" /><p className="text-sidebar">Meetings</p>    
                    </div>
                    
                </div>

                {/*Main Content*/}
                <div className="main-content">
                    {activeView === 'dashboard' && (
                        <>
                            <h1>Officer Dashboard</h1>

                            {/*Features: TO-DO*/}
                            {/*
                            <h2>Create Accounts</h2>
                            <h2>View All Accounts on the system</h2>
                            <h2>View Analytics for user activity</h2>
                            <h2>Change police officers into triage officers</h2>
                            <h2>Change triage officers into police officers</h2>
                            */}
                        </>
                    )}
                    {activeView === 'my-cases' && <OfficerMyCases />}
                    {activeView === 'chats' && <OfficerChats />}
                    {activeView === 'meetings' && <OfficerMeetings />}
                </div>

            </div>

        </>
    );
};

export default OfficerDashboard;