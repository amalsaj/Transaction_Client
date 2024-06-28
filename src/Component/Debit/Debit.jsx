import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Debit.css';

const Debit = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");

  const [data, setData] = useState([
    { name: "user1", balance: 1200 },
    { name: "user2", balance: 1500 },
    { name: "user3", balance: 1800 },
    { name: "user4", balance: 2000 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formBalance, setFormBalance] = useState('');

  const handleDebitClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = data.map(item => 
      item.name === formName ? { ...item, balance: parseFloat(formBalance) } : item
    );
    setData(updatedData);
    setShowForm(false);
  };

  return (
    <div className="container">
      <div className="welcome">
        {username ? <p>Welcome, {username}!</p> : <p>Welcome!</p>}
      </div>
      <div className="cont-1">
        <table className="balance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="debit-button"
          onClick={handleDebitClick}
        >
          Debit
        </button>

        {showForm && (
          <form className="debit-form" onSubmit={handleFormSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>New Balance:</label>
              <input
                type="number"
                value={formBalance}
                onChange={(e) => setFormBalance(e.target.value)}
                required
              />
            </div>
            <button type="submit">Update Balance</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Debit;
