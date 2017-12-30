import React from 'react';
import Header from './Header';
import Form from '../Containers/Form';
import Canvas from './Canvas';
import Colors from '../Containers/Colors';

const App = () => {
  return (
    <div>
      <Header />
      <Form />
      <Canvas />
      <Colors />
    </div>
  );
};

export default App;
