import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FirebaseContext from "./context/FirebaseContext";
import firebaseApp from "./firebase/init";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseContext.Provider value={firebaseApp}>
      <App />
    </FirebaseContext.Provider>
  </StrictMode>,
)
