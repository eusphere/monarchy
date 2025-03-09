import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RelayEnvironmentProvider } from 'react-relay';
import App from './App.tsx';
import environment from './RelayEnvironment';
import Theme from './layout/Theme.tsx';

// Global styles.
import '@radix-ui/themes/styles.css';
import '~/layout/layout.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Theme>
        <App />
      </Theme>
    </RelayEnvironmentProvider>
  </StrictMode>,
);
