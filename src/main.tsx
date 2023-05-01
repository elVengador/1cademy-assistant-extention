import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './utils/AuthContext'
import { initFirebaseClientSDK } from './utils/firestoreClient.config'

initFirebaseClientSDK()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <h1>fa</h1> */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
