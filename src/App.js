import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Header, Image } from 'semantic-ui-react';

import { RenderRoutes, routes } from './routes';
import logo from './assets/logo.svg';
import './assets/App.css';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <header className='App-header'>
          <Header as={Link} to='/'>
            <Image className='App-logo' centered src={logo} alt='logo' />
            Payment Gateway
          </Header>
        </header>
        <RenderRoutes routes={routes} />
      </BrowserRouter>
    </div>
  );
};

export default App;
