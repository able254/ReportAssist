import Header from '../../components/layout/Header';
import './Admin.css';
import { FaUserCircle } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { LuLogs } from 'react-icons/lu';
import { GiPadlock } from 'react-icons/gi';

function AdminDashboard() {
    return (
        <>
            <Header />
            
            <div className="main-container">

                {/*Sidebar Content*/}
                <div className="admin-sidebar">
                    
                    <div className="sidebar-item">
                        <MdSpaceDashboard className="icon-sidebar" /><p className="text-sidebar">Dashboard</p>    
                    </div>

                    <div className="sidebar-item">
                        <LuLogs className="icon-sidebar" /><p className="text-sidebar">System Logs</p>    
                    </div>

                    <div className="sidebar-item">
                        <GiPadlock className="icon-sidebar" /><p className="text-sidebar">Role Management</p>    
                    </div>

                    <div className="sidebar-item">
                        <FaUserCircle className="icon-sidebar" /><p className="text-sidebar">Create Accounts</p>    
                    </div>
                    
                </div>

                {/*Main Content*/}
                <div className="main-content">
                    <h1>Admin Dashboard</h1>

                    {/*Features: TO-DO*/}
                    <h2>Create Accounts</h2>
                    <h2>View All Accounts on the system</h2>
                    <h2>View Analytics for user activity</h2>
                    <h2>Change police officers into triage officers</h2>
                    <h2>Change triage officers into police officers</h2>
                </div>

            </div>
            

        </>
    );
};

export default AdminDashboard;