import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from "@sentry/react";
import './index.css'
import App from './App.jsx'

Sentry.init({
  dsn: "https://21f93fd7f309c495b0883386f1eaa6d1@o4511712134561792.ingest.de.sentry.io/4511712509493328",
  dataCollection: {
    // userInfo: false,
    // httpBodies: []
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)