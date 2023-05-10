import React, { useState, useEffect} from 'react';
import axios from 'axios';

import logo from './assets/psi-testtube.svg'; // Replace 'logo.png' with your actual logo file name and extension



const UserForm = () => {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [message, setMessage] = useState('');
  const [bmi, setBmi] = useState('');

  useEffect(() => {
    if (bmi) {
      setMessage(`Received user information: Age: ${age}, Sex: ${sex}, Height: ${height}, Weight: ${weight}, BMI: ${bmi}`);
    }
  }, [bmi]);  // Run the effect whenever `bmi` changes

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

      const response = await axios.post(`${backendUrl}/api/calculate_bmi`, {
        height: Number(height),
        weight: Number(weight)
      });
      console.log(process.env.REACT_APP_BACKEND_URL)
  
      const receivedBmi = response.data.bmi;
      setBmi(receivedBmi);
      setMessage(`Received user information: Age: ${age}, Sex: ${sex}, Height: ${height}, Weight: ${weight}, BMI: ${receivedBmi}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  
  return (
    <div className="container">
      <h1>Health Recommendations</h1>

      <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="sex">Sex:</label>
            <select className="form-control" id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="height">Height (in cm):</label>
            <input type="number" className="form-control short-input" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="weight">Weight (in kg):</label>
            <input type="number" className="form-control short-input" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    
      {message && <p>{message}</p>}
      <footer>
        <img src={logo} alt="Logo" className='App-logo' />
      </footer>
    </div>
  );
};

export default UserForm;
