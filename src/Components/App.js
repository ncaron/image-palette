import React from 'react';
import Header from './Header';
import Form from '../Containers/Form';
import Canvas from './Canvas';
import Colors from '../Containers/Colors';
import Footer from './Footer';

const App = () => {
  return (
    <div>
      <Header />
      <Form />
      <Canvas />
      <Colors />
      <Footer />
    </div>
  );
};

export default App;
