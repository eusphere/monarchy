import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter } from 'react-router-dom';
import App from '~/views/App';
import environment from '~/RelayEnvironment';
import Theme from '~/layout/Theme';

// Global styles.
import '@radix-ui/themes/styles.css';
import '~/layout/layout.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <Theme>
          <App />
        </Theme>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  </StrictMode>,
);
