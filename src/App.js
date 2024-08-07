import React, { useState, useEffect } from 'react';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import domains from './domains';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // 使用 Telegram Web Apps JavaScript API 读取用户名
    const tg = window.Telegram.WebApp;
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      setUsername(tg.initDataUnsafe.user.username || 'User');
    }
  }, []);

  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <div className="App">
        <header className="App-header">
          <button className="tg-login-button">
            Log in as {username}
          </button>
          <TonConnectButton />
        </header>
        <main>
          <h2>Available Domains</h2>
          <ul>
            {domains.map((domain) => (
              <li key={domain.name}>
                {domain.name} - {domain.price} TON
                <button
                  style={{ backgroundColor: domain.sold ? 'grey' : 'blue' }}
                  disabled={domain.sold}
                >
                  {domain.sold ? 'SOLD' : 'BUY'}
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
