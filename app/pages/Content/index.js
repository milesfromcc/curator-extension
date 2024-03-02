import React from 'react';
import ReactDOM from 'react-dom';
import Popup from '../Popup/Popup';
import '../../tailwind.css';

const iframe = document.createElement('iframe');
iframe.id = 'curation-space-sidebar';
document.body.appendChild(iframe);

iframe.onload = () => {
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="${chrome.runtime.getURL('tailwind.css')}">
        <link rel="stylesheet" href="${chrome.runtime.getURL(
          'content.styles.css'
        )}">
        <script src="${chrome.runtime.getURL(
          'contentScript.bundle.js'
        )}"></script>
    </head>
    <body></body>
    </html>
  `);
  iframe.contentWindow.document.close();

  iframe.contentWindow.document.addEventListener('DOMContentLoaded', () => {
    const iframeDocument = iframe.contentDocument;

    const ELEMENT_overlay = iframeDocument.createElement('div');
    ELEMENT_overlay.id = 'overlay';
    iframeDocument.body.appendChild(ELEMENT_overlay);

    const ELEMENT_sidebar = iframeDocument.createElement('div');
    ELEMENT_sidebar.id = 'sidebar';
    ELEMENT_overlay.appendChild(ELEMENT_sidebar);

    ReactDOM.render(<Popup />, ELEMENT_sidebar);
  });
};

iframe.src = 'about:blank';
