import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const initialName = localStorage.getItem('wafrly_user_name') || 'John Doe';
    const initialEmail = localStorage.getItem('wafrly_user_email') || `${initialName.toLowerCase().replace(/\s+/g, '.')}@wafrly.com`;

    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState(initialName);
    const [userEmail, setUserEmail] = useState(initialEmail);
    const [tempName, setTempName] = useState(initialName);
    const [tempEmail, setTempEmail] = useState(initialEmail);

    // Calculate initials
    const initials = userName
        .split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel case
            setTempName(userName);
            setTempEmail(userEmail);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        // Persist to local storage
        localStorage.setItem('wafrly_user_name', tempName);
        localStorage.setItem('wafrly_user_email', tempEmail);

        // Update local state
        setUserName(tempName);
        setUserEmail(tempEmail);
        setIsEditing(false);

        // Force a page refresh or custom event to update Sidebar if needed
        // For simplicity in this demo, we'll just reload so Sidebar updates initials/name
        window.location.reload();
    };

    return (
        <div className="profile-page">
            <header className="page-header">
                <div>
                    <h1 className="page-title">User Profile</h1>
                    <p className="page-subtitle">Manage your account information and preferences.</p>
                </div>
            </header>

            <div className="profile-grid">
                {/* Main Profile Card */}
                <div className="dashboard-card profile-main-card liquid-glass">
                    <div className="profile-header-content">
                        <div className="profile-avatar-large">
                            {initials}
                        </div>
                        <div className="profile-info-main">
                            <h2 className="profile-name-text">{userName}</h2>
                            <p className="profile-email-text">{userEmail}</p>
                            <span className="profile-badge">Pro Member</span>
                        </div>
                    </div>

                    <div className="profile-details-grid mt-8 pt-8 border-t border-white/10">
                        <div className="detail-item">
                            <span className="detail-label">Full Name</span>
                            {isEditing ? (
                                <input
                                    className="styled-input profile-edit-input"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                />
                            ) : (
                                <span className="detail-value">{userName}</span>
                            )}
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Email Address</span>
                            {isEditing ? (
                                <input
                                    className="styled-input profile-edit-input"
                                    value={tempEmail}
                                    onChange={(e) => setTempEmail(e.target.value)}
                                />
                            ) : (
                                <span className="detail-value">{userEmail}</span>
                            )}
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Account Status</span>
                            <span className="detail-value status-active text-mint">Active</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Member Since</span>
                            <span className="detail-value">March 2026</span>
                        </div>
                    </div>

                    <div className="profile-actions mt-8 flex gap-4">
                        {isEditing ? (
                            <>
                                <button className="save-profile-btn" onClick={handleSave}>Save Changes</button>
                                <button className="cancel-profile-btn" onClick={handleEditToggle}>Cancel</button>
                            </>
                        ) : (
                            <button className="edit-profile-btn" onClick={handleEditToggle}>Edit Profile</button>
                        )}
                    </div>
                </div>

                {/* Security/Account Settings Card */}
                <div className="dashboard-card profile-settings-card liquid-glass">
                    <div className="card-top border-b pb-4 mb-6">
                        <span className="card-label">Account Security</span>
                    </div>

                    <div className="settings-list">
                        <div className="settings-item flex justify-between items-center py-4 border-b border-white/5">
                            <div>
                                <h4 className="settings-item-title text-white font-medium">Two-Factor Authentication</h4>
                                <p className="settings-item-desc text-xs text-gray-400">Add an extra layer of security to your account.</p>
                            </div>
                            <div className="toggle-switch">
                                <input type="checkbox" id="tfa-toggle" />
                                <label htmlFor="tfa-toggle"></label>
                            </div>
                        </div>

                        <div className="settings-item flex justify-between items-center py-4 border-b border-white/5">
                            <div>
                                <h4 className="settings-item-title text-white font-medium">Email Notifications</h4>
                                <p className="settings-item-desc text-xs text-gray-400">Receive weekly summaries and transaction alerts.</p>
                            </div>
                            <div className="toggle-switch">
                                <input type="checkbox" id="email-toggle" defaultChecked />
                                <label htmlFor="email-toggle"></label>
                            </div>
                        </div>

                        <div className="settings-item flex justify-between items-center py-4 border-b border-white/5">
                            <div>
                                <h4 className="settings-item-title text-white font-medium">Dark Mode Appearance</h4>
                                <p className="settings-item-desc text-xs text-gray-400">Toggle between light and dark dashboard themes.</p>
                            </div>
                            <div className="toggle-switch">
                                <input type="checkbox" id="theme-toggle" defaultChecked />
                                <label htmlFor="theme-toggle"></label>
                            </div>
                        </div>

                        <div className="settings-item flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                            <button className="change-password-link text-mint text-sm font-semibold hover:underline">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
