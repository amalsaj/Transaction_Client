import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Debit.css";

const Debit = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");

  const [user_data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/getData");
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formBalance, setFormBalance] = useState("");

  const handleDebitClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = user_data.map((item) =>
      item.name === formName
        ? { ...item, balance: parseFloat(formBalance) }
        : item
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
              <th>Updated Time</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {user_data &&
              user_data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.updatedAt}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <button className="debit-button" onClick={handleDebitClick}>
          Credit
        </button>

        {showForm && (
          <form className="debit-form" onSubmit={handleFormSubmit}>
            <div>
              <label>Choose User:</label>
              <select
                className="sel"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select user
                </option>
                {user_data.map((user, index) => (
                  <option key={index} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
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
