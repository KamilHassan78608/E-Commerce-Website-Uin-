import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './contents/ShopContext.jsx'
import AuthProvider from './contents/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <AuthProvider>
            <App />
      </AuthProvider>
    </ShopContextProvider>
  </BrowserRouter>
)
