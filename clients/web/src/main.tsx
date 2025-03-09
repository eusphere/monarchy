import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RelayEnvironmentProvider } from 'react-relay'
import environment from './RelayEnvironment'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <App />
    </RelayEnvironmentProvider>
  </StrictMode>,
)
