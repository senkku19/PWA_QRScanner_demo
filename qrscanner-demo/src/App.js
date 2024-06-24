import React, { useState } from 'react';
import QrReader from './components/QrReader';

function App() {
  const [openQr, setOpenQr] = useState(false);

  return (
    <div>
      <button onClick={() => setOpenQr(!openQr)}>
        {openQr ? "Close" : "Open"} QrScanner
      </button>
      {openQr && <QrReader />}
    </div>
  );
}

export default App;
