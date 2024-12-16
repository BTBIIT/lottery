import React from 'react';
import './App.css';
import Header from './components/Header';
import DrawPage from './page/DrawPage';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <DrawPage />
    </>
  );
}

export default App;

