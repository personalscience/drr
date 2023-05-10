import React, { useState, useEffect} from 'react';
import axios from 'axios';


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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <label>
          Sex:
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Height (in cm):
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <label>
          Weight (in kg):
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserForm;
