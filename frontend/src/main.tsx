import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SocketProvider } from './context/socketContext.tsx'
import { AuthProvider } from './context/authContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SocketProvider>
  </StrictMode>,
)
