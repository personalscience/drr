// Home.js
import React from 'react';

import homeContent from './assets/home.json'; // Import home content

const Home = () => {
  const { title, description } = homeContent.home;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description.split('\n').map((line, index) => <React.Fragment key={index}>{line}<br /></React.Fragment>)}</p>
    </div>
  );

  }
export default Home;
