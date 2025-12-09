import React, { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('Dr. Smith');
  const [role, setRole] = useState('Radiologist');
  const [contact, setContact] = useState('dr.smith@example.com');
  const [theme, setTheme] = useState('system');
  const [defaultModel, setDefaultModel] = useState('latest');
  const [voiceLanguage, setVoiceLanguage] = useState('EN');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-tabs">
        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
        <button className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`} onClick={() => setActiveTab('preferences')}>Preferences</button>
        <button className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>Notifications</button>
        <button className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>Security</button>
        <button className={`tab-btn ${activeTab === 'system' ? 'active' : ''}`} onClick={() => setActiveTab('system')}>System Info</button>
      </div>

      <div className="settings-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h2>Profile Information</h2>
            <div className="form-group">
              <label>Avatar</label>
              <img src="https://i.pravatar.cc/80" alt="User Avatar" className="profile-avatar" />
              <button className="action-btn">Change Avatar</button>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Radiologist">Radiologist</option>
                <option value="Admin">Admin</option>
                <option value="Researcher">Researcher</option>
              </select>
            </div>
            <div className="form-group">
              <label>Contact Info</label>
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
            <button className="action-btn">Change Password</button>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="preferences-tab">
            <h2>Preferences</h2>
            <div className="form-group">
              <label>Theme</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="system">System</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="form-group">
              <label>Default model</label>
              <select value={defaultModel} onChange={(e) => setDefaultModel(e.target.value)}>
                <option value="latest">Latest Stable</option>
                <option value="experimental">Experimental</option>
              </select>
            </div>
            <div className="form-group">
              <label>Voice language / accent</label>
              <select value={voiceLanguage} onChange={(e) => setVoiceLanguage(e.target.value)}>
                <option value="EN">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-tab">
            <h2>Notifications</h2>
            <label className="checkbox-group">
              <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
              Email notifications (on case completion, report sign-off)
            </label>
            <label className="checkbox-group">
              <input type="checkbox" checked={pushNotifications} onChange={(e) => setPushNotifications(e.target.checked)} />
              Push notifications
            </label>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="security-tab">
            <h2>Security</h2>
            <label className="checkbox-group">
              <input type="checkbox" checked={twoFactorEnabled} onChange={(e) => setTwoFactorEnabled(e.target.checked)} />
              Enable Two-Factor Authentication
            </label>
            <p>Active sessions: ...</p>
            <p>API keys: ...</p>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="system-tab">
            <h2>System Information</h2>
            <p>Current model version: v1.2.0</p>
            <p>Inference backend: GPU Cluster A</p>
            <p>Update logs: ...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
