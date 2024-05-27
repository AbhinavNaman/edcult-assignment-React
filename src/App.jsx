// src/App.jsx
import React from 'react';
import CardCarousel from './components/CardCarousel';
import ChatInput from './components/ChatInput';
import './App.css';
import OtherOptions from './components/OtherOptions';

const App = () => {
  return (
    <div className=" flex justify-center font-sans w-full">
    <div className="mx-20 m-10  flex flex-col gap-8">
      {/* <h1 className='text-3xl text-center font-semibold'>Copilot</h1> */}
      <CardCarousel />
      <OtherOptions/>
      <ChatInput />
    </div>
    </div>
  );
};

export default App;
