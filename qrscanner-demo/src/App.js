import React, { useState } from 'react';
import QrReader from './components/QrReader';
import './App.css';

function App() {
  const [openQr, setOpenQr] = useState(false);

  return (
    <div>
    <div className='container'>
      <h1>A Demo</h1>
      <p>This demo showcases PWA access to a camera and QR code scanning. This demo has been done with the help of this tutorial: </p>
      <a href="https://paulho1973.medium.com/create-qr-code-scanner-using-react-pwa-97b0b9bc1a73">A Link to the tutorial</a>
      <button className='qr-button' onClick={() => setOpenQr(!openQr)}>
        {openQr ? "Close" : "Open"} QrScanner
      </button>
         </div>
      {openQr && <QrReader />}
 </div>
  );
}

export default App;
