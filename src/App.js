import React from 'react';
import { Image, Divider, Header } from 'semantic-ui-react';

import logo from './assets/logo.svg';
import './assets/App.css';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Header>
          <Image className='App-logo' centered src={logo} alt='logo' />
            Payment Gateway
          </Header>
      </header>
      <Divider />
    </div>
  );
};

export default App;
