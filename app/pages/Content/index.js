import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.createElement('div');
root.id = 'wrapper';
document.body.appendChild(root);

ReactDOM.createRoot(root).render(<App />);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import App from './App';

// class IframeDocumentProvider extends React.Component {
//   getChildContext() {
//     return { document: this.props.iframeDocument };
//   }

//   render() {
//     return this.props.children;
//   }
// }

// IframeDocumentProvider.childContextTypes = {
//   document: PropTypes.object,
// };

// const iframe = document.createElement('iframe');
// iframe.id = 'curation-space-sidebar';
// document.body.appendChild(iframe);

// iframe.onload = () => {
//   iframe.contentWindow.document.open();
//   iframe.contentWindow.document.write(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <link rel="stylesheet" href="${chrome.runtime.getURL(
//           'content.styles.css'
//         )}">
//         <link rel="stylesheet" href="${chrome.runtime.getURL(
//           'processed-tailwind.css'
//         )}">
//         <script src="${chrome.runtime.getURL(
//           'contentScript.bundle.js'
//         )}"></script>
//     </head>
//     <body></body>
//     </html>
//   `);
//   iframe.contentWindow.document.close();

//   iframe.contentWindow.document.addEventListener('DOMContentLoaded', () => {
//     const iframeDocument = iframe.contentDocument;

//     let ELEMENT_overlay = iframeDocument.getElementById('overlay');

//     if (!ELEMENT_overlay) {
//       ELEMENT_overlay = iframeDocument.createElement('div');
//       ELEMENT_overlay.id = 'overlay';
//       iframeDocument.body.appendChild(ELEMENT_overlay);
//     }

//     let ELEMENT_sidebar = iframeDocument.getElementById('sidebar');

//     if (!ELEMENT_sidebar) {
//       ELEMENT_sidebar = iframeDocument.createElement('div');
//       ELEMENT_sidebar.id = 'sidebar';
//       ELEMENT_overlay.appendChild(ELEMENT_sidebar);
//     }

//     if (!ELEMENT_sidebar.hasChildNodes()) {
//       const root = ReactDOM.createRoot(ELEMENT_sidebar);
//       root.render(
//         ReactDOM.createPortal(
//           <IframeDocumentProvider iframeDocument={iframe.contentDocument}>
//             <App />
//           </IframeDocumentProvider>,
//           ELEMENT_sidebar
//         )
//       );
//     }
//   });
// };

// iframe.src = 'about:blank';
// iframe.sandbox = 'allow-scripts';
