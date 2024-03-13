import React from 'react';
import './App.css';
import QRScanner from './QRScanner';
function App() {
  const handleScannedData = (data) => {
    console.log(data); // Do something with the scanned data
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Pass the handleScannedData as a prop if you want to use it */}
        <QRScanner onScan={handleScannedData} />
      </header>
    </div>
  );
}

export default App;
