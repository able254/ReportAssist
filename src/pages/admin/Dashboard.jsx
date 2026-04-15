import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import './Admin.css';
import { FaUserCircle } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { LuLogs } from 'react-icons/lu';
import { GiPadlock } from 'react-icons/gi';
import SystemLogs from '../../components/functions/admin/SystemLogs';
import RoleManagement from '../../components/functions/admin/RoleManagement';
import CreateAccounts from '../../components/functions/admin/CreateAccounts';

function AdminDashboard() {
    const [activeView, setActiveView] = useState('dashboard');

    return (
        <>
            <Header />
            
            <div className="main-container">

                <div className="admin-sidebar">
                    
                    <div className={`sidebar-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>
                        <MdSpaceDashboard className="icon-sidebar" /><p className="text-sidebar">Dashboard</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'system-logs' ? 'active' : ''}`} onClick={() => setActiveView('system-logs')}>
                        <LuLogs className="icon-sidebar" /><p className="text-sidebar">System Logs</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'role-management' ? 'active' : ''}`} onClick={() => setActiveView('role-management')}>
                        <GiPadlock className="icon-sidebar" /><p className="text-sidebar">Role Management</p>    
                    </div>

                    <div className={`sidebar-item ${activeView === 'create-accounts' ? 'active' : ''}`} onClick={() => setActiveView('create-accounts')}>
                        <FaUserCircle className="icon-sidebar" /><p className="text-sidebar">Create Accounts</p>    
                    </div>
                    
                </div>

                {/*Main Content*/}
                <div className="main-content">
                    {activeView === 'dashboard' && (
                        <>
                            <h1>Admin Dashboard</h1>

                            {/*Features: TO-DO*/}
                            <h2>Create Accounts</h2>
                            <h2>View All Accounts on the system</h2>
                            <h2>View Analytics for user activity</h2>
                            <h2>Change police officers into triage officers</h2>
                            <h2>Change triage officers into police officers</h2>
                        </>
                    )}
                    {activeView === 'system-logs' && <SystemLogs />}
                    {activeView === 'role-management' && <RoleManagement />}
                    {activeView === 'create-accounts' && <CreateAccounts />}
                </div>

            </div>
            

        </>
    );
};

export default AdminDashboard;