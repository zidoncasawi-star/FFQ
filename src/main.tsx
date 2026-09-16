// Polyfill window.fetch setter if in an environment where window.fetch has only a getter
try {
  if (typeof window !== 'undefined') {
    const origFetch = window.fetch ? window.fetch.bind(window) : undefined;
    let customFetch = origFetch;
    Object.defineProperty(window, 'fetch', {
      get: () => customFetch || (origFetch ? origFetch : window.fetch),
      set: (fn) => {
        customFetch = fn;
      },
      configurable: true,
      enumerable: true,
    });
  }
} catch (_) {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
