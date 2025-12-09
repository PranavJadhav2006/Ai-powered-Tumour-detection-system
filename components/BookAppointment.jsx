import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './Dashboard';
import Patients from './Patients';
import PatientDetails from './PatientDetails';
import PatientVisitRecords from './PatientVisitRecords';
import BackupRecords from './BackupRecords';
import AddPatient from './AddPatient';

const BookAppointment = () => {
  const navLinkStyle = {
    textDecoration: 'none',
    color: '#495057',
    fontWeight: '500',
    padding: '10px',
    borderRadius: '5px',
  };

  const activeNavLinkStyle = {
    backgroundColor: '#0d6efd',
    color: 'white',
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
      <nav style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #dee2e6', paddingBottom: '10px' }}>
        <NavLink to="dashboard" style={({ isActive }) => (isActive ? { ...navLinkStyle, ...activeNavLinkStyle } : navLinkStyle)}>Dashboard</NavLink>
        <NavLink to="patients" style={({ isActive }) => (isActive ? { ...navLinkStyle, ...activeNavLinkStyle } : navLinkStyle)}>Patients</NavLink>
        <NavLink to="patient-details" style={({ isActive }) => (isActive ? { ...navLinkStyle, ...activeNavLinkStyle } : navLinkStyle)}>Patient Details</NavLink>
        <NavLink to="patient-visit-records" style={({ isActive }) => (isActive ? { ...navLinkStyle, ...activeNavLinkStyle } : navLinkStyle)}>Patient Visit Records</NavLink>
        <NavLink to="backup-records" style={({ isActive }) => (isActive ? { ...navLinkStyle, ...activeNavLinkStyle } : navLinkStyle)}>Backup Records</NavLink>
        <NavLink to="add-patient" style={({ isActive }) => (isActive ? { ...navLinkStyle, ...activeNavLinkStyle } : navLinkStyle)}>Add Patient</NavLink>
      </nav>
      <div className="book-appointment-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patient-details" element={<PatientDetails />} />
          <Route path="patient-visit-records" element={<PatientVisitRecords />} />
          <Route path="backup-records" element={<BackupRecords />} />
          <Route path="add-patient" element={<AddPatient />} />
        </Routes>
      </div>
    </div>
  );
};

export default BookAppointment;