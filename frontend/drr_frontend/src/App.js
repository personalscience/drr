// App.js
import React, { useEffect } from 'react';
import './App.css';
import { IntlProvider, FormattedMessage } from "react-intl";
import { AppContextProvider } from './AppContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { messages } from './i18n';  // Import messages from i18n/index.js


import Input from './Input';
import Results from './Results';
import Diet from './Diet';
import Navbar from './Navigation';
import Settings from './Settings';
import Home from './Home';
import Footer from './Footer'; // Import Footer

import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import logo from './logo.svg';


const locale = navigator.language || "en-US";
//const locale = "zh-CN"; 


function App() {
  console.log(messages, locale)
    useEffect(() => {
    addResponseMessage('Do you have any questions about your plan?');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5005";  // Fallback to localhost if the environment variable is not set
    fetch(`${backendUrl}/webhooks/rest/webhook`, {
        method: "POST",
        body: JSON.stringify({message: newMessage}),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        addResponseMessage(data.text);
        addResponseMessage(data.updated_recommendation);
    })
    .catch((error) => {
    console.log(error)
    })
  };

  return (
    <div className="App">
      <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={logo}
          title="Ask Dr"
          subtitle="Share your goals in your own words"
      />
      <AppContextProvider>
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
      </AppContextProvider>
    </div>
  );
}

export default App;
