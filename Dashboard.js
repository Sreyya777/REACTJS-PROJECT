import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const {state} = useLocation();
    const { user } = state;
  return (
    <div className='dashboard'>
      <div className='details'>
        <h2>👋Welcome,  {user.userName}!</h2>
        <br />
        <p><strong>Role :</strong> {user.role}</p>
        <p><strong>Experience :</strong> {user.experience} Years</p>
        <p><strong>Level :</strong> {user.level}</p>
      </div>
    </div>
  );
};

export default Dashboard;