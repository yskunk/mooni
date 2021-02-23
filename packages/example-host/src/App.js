import React, { useCallback } from 'react';
import './App.css';

import UsdlayerWidget from '@usdlayer/widget';

const usdlayer = new UsdlayerWidget({
  token: '0xb683D83a532e2Cb7DFa5275eED3698436371cc9f',
  ethereum: window.ethereum,
});

function App() {
  const openUsdlayer = useCallback(() => {
    usdlayer.open();
  }, []);

  return (
    <div className="App">
      <header className="App-header">My awesome marketplace</header>
      <main className="App-main">
        <button className="open-widget" onClick={openUsdlayer}>
          Cash out
        </button>
      </main>
    </div>
  );
}

export default App;
