// Settings.js

import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const Settings = () => {
  const { unitSystem, setUnitSystem } = useContext(AppContext);

  const handleChange = (event) => {
    setUnitSystem(event.target.value);
  };

  return (
    <div>
      <h2>Settings</h2>
      <form>
        <label>
          Unit system:
          <select value={unitSystem} onChange={handleChange}>
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default Settings;
