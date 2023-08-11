import React from 'react';


import App from './App';
import './tailwind.css';


import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);   // notice the '!'
root.render(<App />);

