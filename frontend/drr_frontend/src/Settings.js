// Settings.js

import React, { useContext } from 'react';
import { AppContext } from './AppContext';

import { useIntl, FormattedMessage } from 'react-intl';

const Settings = () => {
  const { unitSystem, setUnitSystem } = useContext(AppContext);
  const intl = useIntl();

  const handleChange = (event) => {
    setUnitSystem(event.target.value);
  };

  return (
    <div>
      <h2><FormattedMessage id="settings.title" /></h2>
      <form>
      <label>
        <FormattedMessage id="settings.system" />
        <select value={unitSystem} onChange={handleChange}>
          <option value="metric">{intl.formatMessage({ id: 'settings.system.metric' })}</option>
          <option value="imperial">{intl.formatMessage({ id: 'settings.system.imperial' })}</option>
        </select>
      </label>
    </form>
    </div>
  );
};

export default Settings;
