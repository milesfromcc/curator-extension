import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';
import '../../tailwind.css';

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(
  <div className="p-3 h-full">
    <Popup />
  </div>
);
