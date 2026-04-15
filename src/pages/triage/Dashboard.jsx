import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import './Triage.css';

import { MdSpaceDashboard } from 'react-icons/md';
import { FaQuestionCircle } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import { TbReport } from 'react-icons/tb';
import Reports from '../../components/functions/triage/Reports';
import Inquiries from '../../components/functions/triage/Inquiries';
import Cases from '../../components/functions/triage/Cases';

function TriageDashboard() {
    const [activeView, setActiveView] = useState('dashboard');

    return (
        <>
            <Header />

            <div className="main-container">
                
                {/*Sidebar Content*/}
                <div className="triage-sidebar">
                    
                    <div className={`sidebar-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>
                        <MdSpaceDashboard className="icon-sidebar" /><p className="text-sidebar">Dashboard</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'reports' ? 'active' : ''}`} onClick={() => setActiveView('reports')}>
                        <TbReport className="icon-sidebar" /><p className="text-sidebar">Reports</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveView('inquiries')}>
                        <FaQuestionCircle className="icon-sidebar" /><p className="text-sidebar">Inquiries</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'cases' ? 'active' : ''}`} onClick={() => setActiveView('cases')}>
                        <IoIosDocument className="icon-sidebar" /><p className="text-sidebar">Cases</p>    
                    </div>
                    
                </div>

                {/*Main Content*/}
                <div className="main-content">
                    {activeView === 'dashboard' && (
                        <>
                            <h1>Triage Dashboard</h1>

                            {/*Features: TO-DO*/}
                            {/*<h2>Create Accounts</h2>
                            <h2>View All Accounts on the system</h2>
                            <h2>View Analytics for user activity</h2>
                            <h2>Change police officers into triage officers</h2>
                            <h2>Change triage officers into police officers</h2>*/}
                        </>
                    )}
                    {activeView === 'reports' && <Reports />}
                    {activeView === 'inquiries' && <Inquiries />}
                    {activeView === 'cases' && <Cases />}
                </div>
        
            </div>

        </>
    );
};

export default TriageDashboard;