// Home.js
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Home = () => {
  return (
    <div>
      <h2><FormattedMessage id="home.title" /></h2>
      <p><FormattedMessage id="home.description" /></p>
    </div>
  );
}

export default Home;
