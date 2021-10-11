import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainView from './pages/MainPage';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={MainView} />
    </Switch>
  );
};

export default App;
