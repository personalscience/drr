import React, { useState } from 'react';
import axios from 'axios';


const UserForm = () => {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [message, setMessage] = useState('');
  const [bmi, setBmi] = useState('');


  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
    } else {
      setBmi('');
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(`Received user information: Age: ${age}, Sex: ${sex}, Height: ${height}, Weight: ${weight}`);
    calculateBMI();
  
    try {
        const response = await axios.post('http://localhost:5001/api/user_info', {
        age,
        sex,
        height,
        weight,
        bmi,
      });
      console.log(response.data);
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
      {message && <p>{message}{bmi && `, BMI: ${bmi}`}</p>}
    </div>
  );
};

export default UserForm;
