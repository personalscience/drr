// App.js
import React from 'react';
import './App.css';
import { IntlProvider, FormattedMessage } from "react-intl";
import { AppProvider } from './AppContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { messages } from './i18n';  // Import messages from i18n/index.js


import Input from './Input';
import Results from './Results';
import Diet from './Diet';
import Navbar from './Navigation';
import Settings from './Settings';
import Home from './Home';
import Footer from './Footer'; // Import Footer


const locale = navigator.language || "en-US";
//const locale = "zh-CN"; 


function App() {
  console.log(messages, locale)
  return (
    <div className="App">
      <AppProvider>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <Router>

            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/input" element={<Input />} />
              <Route path="/results" element={<Results />} />
              <Route path="/diet" element={<Diet />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <Footer />
          </Router>
        </IntlProvider>
      </AppProvider>
    </div>
  );
}

export default App;
