import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';
import '../../tailwind.css';

const container = document.getElementById('app-container');

if (!container) {
  throw new Error("Couldn't find element with id 'app-container'");
}

const root = createRoot(container);

root.render(
  <div className="h-full">
    <Popup />
  </div>
);
