import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SocketProvider } from './context/socketContext.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { UserContextProvider } from './context/usersContext.tsx'
import { SelectUserIdProvider } from './context/selectedUserContext.tsx'
createRoot(document.getElementById('root')!).render(
 <AuthProvider>
   <StrictMode>
      <SelectUserIdProvider>
        <UserContextProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </UserContextProvider>
      </SelectUserIdProvider>        
    </StrictMode>
</AuthProvider>,
)
