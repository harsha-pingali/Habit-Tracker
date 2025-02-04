import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <div className="bg">
         <App />
      </div>
   </StrictMode>
)
