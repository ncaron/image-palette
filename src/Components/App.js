import React from 'react';
import Header from './Header';
import Canvas from '../Containers/Canvas';
import Colors from '../Containers/Colors';

const App = () => {
  return (
    <div>
      <Header />
      <Canvas />
      <Colors />
    </div>
  );
};

export default App;
