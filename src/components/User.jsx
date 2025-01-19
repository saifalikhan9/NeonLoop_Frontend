import React, { useState } from 'react';
import { neonEffect } from '../utils/neonEffect';

const UserProfile = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(null);

  const handleEdit = (field) => {
    setEditing(field);
  };

  const handleSave = (field, value) => {
    setUser({ ...user, [field]: value });
    setEditing(null);
  };

  const renderField = (field, label) => {
    return (
      <div className="mb-4">
        <span className="font-semibold mr-2">{label}:</span>
        {editing === field ? (
          <input
            type="text"
            value={user[field]}
            onChange={(e) => setUser({ ...user, [field]: e.target.value })}
            className="bg-gray-800 text-white px-2 py-1 rounded"
            onBlur={() => handleSave(field, user[field])}
            autoFocus
          />
        ) : (
          <>
            <span>{user[field]}</span>
            <button
              onClick={() => handleEdit(field)}
              className={`ml-2 px-2 py-1 rounded ${neonEffect('blue')} hover:bg-blue-900 transition-colors duration-200`}
            >
              Edit
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className={`text-4xl font-bold mb-8 text-center ${neonEffect('purple')}`}>User Profile</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          {renderField('name', 'Name')}
          {renderField('email', 'Email')}
          {renderField('phone', 'Phone')}
          {renderField('address', 'Address')}
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className={`text-2xl font-semibold mb-4 ${neonEffect('green')}`}>Order History</h2>
          <ul>
            {user.orders.map((order) => (
              <li key={order.id} className="mb-2">
                <span className="font-semibold">{order.date}:</span> {order.product} - ${order.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

