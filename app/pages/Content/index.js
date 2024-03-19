// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from '../Popup/Popup';

// const root = document.createElement('div');
// root.id = 'curation_space_wrapper';
// document.body.appendChild(root);

// const overlay = document.createElement('div');
// overlay.id = 'curation_space_overlay';

// const sidebar = document.createElement('div');
// sidebar.id = 'curation_space_sidebar';

// overlay.appendChild(sidebar);
// root.appendChild(overlay);

// const iframe = document.createElement('iframe');
// sidebar.appendChild(iframe);

// iframe.onload = () => {
//   const root = iframe.contentDocument.querySelector('#root');
//   ReactDOM.createRoot(root).render(<App />);
// };

// iframe.srcdoc = `
//     <!DOCTYPE html>
//     <html>
//         <head>
//                 <link rel="stylesheet" href="${chrome.runtime.getURL(
//                   'iframe.styles.css'
//                 )}">
//                 <link rel="stylesheet" href="${chrome.runtime.getURL(
//                   'content.styles.css'
//                 )}">
//                 <link rel="stylesheet" href="${chrome.runtime.getURL(
//                   'processed-tailwind.css'
//                 )}">
//                 <script src="${chrome.runtime.getURL(
//                   'contentScript.bundle.js'
//                 )}"></script>
//         </head>
//         <body>
//                 <div id="root"></div>
//         </body>
//     </html>
// `; // This triggers the iframe to load

// ABOVE CODE IS THE FINAL WORKING CODE
// UNCOMMENT THIS CODE TO RENDER THE IFRAME IN THE DOM
