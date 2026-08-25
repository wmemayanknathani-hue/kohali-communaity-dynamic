import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@fontsource/mukta/400.css";
import "@fontsource/mukta/500.css";
import "@fontsource/mukta/700.css";

import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/700.css";

import "@fontsource/yatra-one/400.css";

import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/700.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
