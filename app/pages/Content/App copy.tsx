// import React, {
//   IframeHTMLAttributes,
//   ReactNode,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import { createPortal } from 'react-dom';
// import { Spinner, Typography } from '@material-tailwind/react';
// import Login from './views/login';
// import PushToContentList from './views/push_to_content_list';

// import { ChevronDown } from 'lucide-react';
// import {
//   Cog6ToothIcon,
//   Square3Stack3DIcon,
//   UserCircleIcon,
//   SignalIcon,
//   CheckCircleIcon,
// } from '@heroicons/react/24/outline';
// import { InfoCircledIcon, QuestionMarkIcon } from '@radix-ui/react-icons';
// import { User } from '../../entities/user';

// import { Button } from './components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './components/ui/dropdown-menu';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from './components/ui/tooltip';

// // import './content.styles.css';
// import '../../processed-tailwind.css';

// // Create a context with an initial value of null
// const IFrameContext = React.createContext<Document | null>(null);

// interface IFrameProps extends IframeHTMLAttributes<HTMLIFrameElement> {
//   children?: ReactNode;
// }

// const IFrame: React.FC<IFrameProps> = ({ children, ...props }) => {
//   const [contentRef, setContentRef] = useState<HTMLBodyElement | null>(null);
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const [iframeDoc, setIframeDoc] = useState<Document | null>(null);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     const iframeContent = iframe?.contentWindow?.document.body;
//     const iframeHead = iframe?.contentWindow?.document.head;

//     if (iframeContent) {
//       //@ts-ignore
//       setContentRef(iframeContent);
//     }

//     if (iframeHead) {
//       const linkA = document.createElement('link');
//       const linkB = document.createElement('link');
//       linkA.rel = 'stylesheet';
//       linkB.rel = 'stylesheet';
//       linkA.href = chrome.runtime.getURL('content.style.css');
//       linkB.href = chrome.runtime.getURL('processed-tailwind.css');
//       iframeHead.appendChild(linkA);
//       iframeHead.appendChild(linkB);
//     }

//     // @ts-ignore
//     setIframeDoc(iframe?.contentDocument || iframe?.contentWindow?.document);
//   }, []);

//   return (
//     <IFrameContext.Provider value={iframeDoc}>
//       <iframe title="IFrame" ref={iframeRef} {...props}>
//         {contentRef && createPortal(children, contentRef)}
//       </iframe>
//     </IFrameContext.Provider>
//   );
// };

// const AppContent = () => {
//   // useEffect(() => {
//   //   function handlePopupOpened(event: MessageEvent) {
//   //     if (event.data.type === 'POPUP_OPENED') {
//   //       // Handle the popup being opened here
//   //     }
//   //   }

//   //   window.addEventListener('message', handlePopupOpened);

//   //   return () => {
//   //     window.removeEventListener('message', handlePopupOpened);
//   //   };
//   // }, []);

//   const iframeDoc = React.useContext(IFrameContext);

//   const [showOverlay, setShowOverlay] = useState<boolean>(false);
//   const [overlayTitle, setOverlayTitle] = useState<string>('');

//   const [user, setUser] = useState<User | null>(
//     localStorage.getItem('user')
//       ? JSON.parse(localStorage.getItem('user') || '')
//       : null
//   );

//   const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(
//     user !== null ? true : false
//   );

//   const [activeViewTab, setActiveViewTab] = useState<
//     'loading' | 'login' | 'push_to_content_list'
//   >('login');

//   useEffect(() => {
//     setUserIsLoggedIn(user !== null ? true : false);
//   }, [user]);

//   useEffect(() => {
//     setActiveViewTab(userIsLoggedIn ? 'push_to_content_list' : 'login');
//   }, [userIsLoggedIn]);

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const [ref, setRef] = useState<HTMLIFrameElement | null>(null);
//   const container = ref?.contentWindow?.document?.body;

//   return iframeBody
//     ? createPortal(
//         <IFrameContext.Provider value={iframeDoc}>
//           {/* Your application code here */}
//         </IFrameContext.Provider>,
//         iframeBody
//       )
//     : null;

//   // return createPortal(
//   //   <IFrameContext.Provider value={iframeDoc}>
//   // <div className="relative h-full">
//   //   {showOverlay && (
//   //     <button
//   //       className="absolute inset-0 flex z-10 flex-col justify-center items-center"
//   //       onClick={() => {
//   //         window.close();
//   //       }}
//   //     >
//   //       <div className="bg-gray-800 opacity-75 backdrop-blur-2px w-full h-full pointer-events-none"></div>
//   //       <div className="absolute flex flex-col justify-between items-center p-6 bg-white rounded-lg h-4/5 w-4/5">
//   //         <div className="flex flex-col items-center">
//   //           <CheckCircleIcon className="h-16 w-16 text-green-600" />
//   //           <Typography variant="h6" className="mt-1">
//   //             Saved to {overlayTitle}
//   //           </Typography>
//   //           <p className="text-sm">Click anywhere to close</p>
//   //         </div>
//   //         <Button
//   //           onClick={(e) => {
//   //             e.stopPropagation();
//   //             setShowOverlay(false);
//   //           }}
//   //           type="submit"
//   //           variant="outline"
//   //           className="w-full"
//   //         >
//   //           Push another link
//   //         </Button>
//   //       </div>
//   //     </button>
//   //   )}
//   //   <div className="flex flex-col justify-between h-full">
//   //     <header className="flex justify-center items-center h-fit bg-gray-100 px-1 py-2">
//   //       <img src={chrome.runtime.getURL('logo.png')} className="w-6 h-6" />
//   //       <p className="ml-0.5 text-base">
//   //         <strong className="font-semibold">curation</strong>space
//   //       </p>
//   //     </header>
//   //     <main className="grow">
//   //       {userIsLoggedIn !== false && user !== null && (
//   //         <div className="w-full justify-between flex border-b border-gray-200 px-2 py-3">
//   //           <div className="flex items-center">
//   //             <img
//   //               src={user.photoURL}
//   //               alt="profile picture"
//   //               className="aspect-circle h-8 w-8 min-w-8 rounded-full object-cover"
//   //             />
//   //             <div className="ml-1.5">
//   //               <p className="font-semibold text-sm leading-none">
//   //                 {user.displayName}
//   //               </p>
//   //               <p className="text-xs">
//   //                 <a
//   //                   href={`https://www.curation.space/${user.uid}`}
//   //                   target="_blank"
//   //                   rel="noopener noreferrer"
//   //                   className="hover:text-blue-500"
//   //                 >
//   //                   @{user.uid}
//   //                 </a>
//   //               </p>
//   //             </div>
//   //           </div>
//   //           <DropdownMenu>
//   //             <DropdownMenuTrigger asChild>
//   //               <Button variant="ghost" size="icon">
//   //                 <ChevronDown className="h-4 w-4"></ChevronDown>d
//   //               </Button>
//   //             </DropdownMenuTrigger>
//   //             <DropdownMenuContent align="end" className="w-40">
//   //               <DropdownMenuGroup>
//   //                 <DropdownMenuItem>
//   //                   <a
//   //                     href="https://curation.space/"
//   //                     target="_blank"
//   //                     rel="noopener noreferrer"
//   //                     className="w-full flex items-center justify-start font-normal"
//   //                   >
//   //                     <UserCircleIcon className="h-4 w-4 mr-1.5 text-black" />
//   //                     Profile
//   //                   </a>
//   //                 </DropdownMenuItem>
//   //                 <DropdownMenuItem>
//   //                   <a
//   //                     href="https://curation.space"
//   //                     target="_blank"
//   //                     rel="noopener noreferrer"
//   //                     className="w-full flex items-center justify-start font-normal"
//   //                   >
//   //                     <Cog6ToothIcon className="h-4 w-4 mr-1.5 text-black" />
//   //                     Account
//   //                   </a>
//   //                 </DropdownMenuItem>
//   //               </DropdownMenuGroup>
//   //               <DropdownMenuSeparator />
//   //               <DropdownMenuGroup>
//   //                 <DropdownMenuItem>
//   //                   <a
//   //                     href="https://curation.space"
//   //                     target="_blank"
//   //                     rel="noopener noreferrer"
//   //                     className="w-full flex items-center justify-start font-normal"
//   //                   >
//   //                     <SignalIcon className="w-4 h-4 mr-1.5 text-black" />
//   //                     Feed Manager
//   //                   </a>
//   //                 </DropdownMenuItem>
//   //                 <DropdownMenuItem>
//   //                   <a
//   //                     href="https://curation.space"
//   //                     target="_blank"
//   //                     rel="noopener noreferrer"
//   //                     className="w-full flex items-center justify-start font-normal"
//   //                   >
//   //                     <Square3Stack3DIcon className="w-4 h-4 mr-1.5 text-black" />
//   //                     Curation Station
//   //                   </a>
//   //                 </DropdownMenuItem>
//   //               </DropdownMenuGroup>
//   //               <DropdownMenuSeparator />
//   //               <DropdownMenuGroup>
//   //                 <DropdownMenuItem className="py-0">
//   //                   <Button
//   //                     className="font-normal text-sm px-0 justify-start w-full"
//   //                     size="sm"
//   //                     variant="ghost"
//   //                     onClick={handleLogout}
//   //                   >
//   //                     Logout
//   //                   </Button>
//   //                 </DropdownMenuItem>
//   //               </DropdownMenuGroup>
//   //             </DropdownMenuContent>
//   //           </DropdownMenu>
//   //         </div>
//   //       )}
//   //       <div className="mx-auto w-5/6 mt-2">
//   //         {activeViewTab === 'login' && <Login setUser={setUser} />}
//   //         {activeViewTab === 'push_to_content_list' && user !== null && (
//   //           <PushToContentList
//   //             ownerUid={user.uid}
//   //             setShowOverlay={(overlayTitle: string) => {
//   //               setShowOverlay(true);
//   //               setOverlayTitle(overlayTitle);
//   //             }}
//   //           />
//   //         )}
//   //       </div>
//   //     </main>
//   //     <footer className="text-center mt-6">
//   //       <div className="bg-gray-100 p-2.5 flex justify-between">
//   //         <div>
//   //           <Button
//   //             size="sm"
//   //             variant="outline"
//   //             onClick={() =>
//   //               window.open('https://www.curation.space', '_blank')
//   //             }
//   //           >
//   //             Open the web app
//   //           </Button>
//   //         </div>
//   //         <div className="flex items-center">
//   //           <TooltipProvider>
//   //             <Tooltip>
//   //               <TooltipTrigger asChild>
//   //                 <a
//   //                   className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
//   //                   href="https://www.curation.space"
//   //                   target="_blank"
//   //                   rel="noopener noreferrer"
//   //                 >
//   //                   <QuestionMarkIcon className="w-4 h-4" />
//   //                 </a>
//   //               </TooltipTrigger>
//   //               <TooltipContent side="top">FAQ</TooltipContent>
//   //             </Tooltip>
//   //           </TooltipProvider>

//   //           <TooltipProvider>
//   //             <Tooltip>
//   //               <TooltipTrigger asChild>
//   //                 <a
//   //                   className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
//   //                   href="https://www.curation.space"
//   //                   target="_blank"
//   //                   rel="noopener noreferrer"
//   //                 >
//   //                   <InfoCircledIcon className="w-4 h-4" />
//   //                 </a>
//   //               </TooltipTrigger>
//   //               <TooltipContent side="top">About</TooltipContent>
//   //             </Tooltip>
//   //           </TooltipProvider>
//   //         </div>
//   //       </div>
//   //     </footer>
//   //   </div>
//   // </div>
//   //   </IFrameContext.Provider>
//   // );
// };

// const App: React.FC = () => {
//   const [bodyRef, setBodyRef] = useState<HTMLBodyElement | null>(null);
//   const refToIframe = useRef<HTMLIFrameElement>(null);

//   useEffect(() => {
//     const currentIframe = refToIframe.current;
//     const bodyOfIframe = currentIframe?.contentWindow?.document.body;

//     if (bodyOfIframe) {
//       setBodyRef(bodyOfIframe);
//     }
//   }, []);

//   // Your application code here...

//   return (
//     <div>
//       <iframe ref={refToIframe} style={{ display: 'none' }} />
//       {bodyRef &&
//         createPortal(
//           <IFrameContext.Provider value={iframeDoc}>
//             {/* Your application code here */}
//             <div className="relative h-full">
//               {showOverlay && (
//                 <button
//                   className="absolute inset-0 flex z-10 flex-col justify-center items-center"
//                   onClick={() => {
//                     window.close();
//                   }}
//                 >
//                   <div className="bg-gray-800 opacity-75 backdrop-blur-2px w-full h-full pointer-events-none"></div>
//                   <div className="absolute flex flex-col justify-between items-center p-6 bg-white rounded-lg h-4/5 w-4/5">
//                     <div className="flex flex-col items-center">
//                       <CheckCircleIcon className="h-16 w-16 text-green-600" />
//                       <Typography variant="h6" className="mt-1">
//                         Saved to {overlayTitle}
//                       </Typography>
//                       <p className="text-sm">Click anywhere to close</p>
//                     </div>
//                     <Button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setShowOverlay(false);
//                       }}
//                       type="submit"
//                       variant="outline"
//                       className="w-full"
//                     >
//                       Push another link
//                     </Button>
//                   </div>
//                 </button>
//               )}
//               <div className="flex flex-col justify-between h-full">
//                 <header className="flex justify-center items-center h-fit bg-gray-100 px-1 py-2">
//                   <img
//                     src={chrome.runtime.getURL('logo.png')}
//                     className="w-6 h-6"
//                   />
//                   <p className="ml-0.5 text-base">
//                     <strong className="font-semibold">curation</strong>space
//                   </p>
//                 </header>
//                 <main className="grow">
//                   {userIsLoggedIn !== false && user !== null && (
//                     <div className="w-full justify-between flex border-b border-gray-200 px-2 py-3">
//                       <div className="flex items-center">
//                         <img
//                           src={user.photoURL}
//                           alt="profile picture"
//                           className="aspect-circle h-8 w-8 min-w-8 rounded-full object-cover"
//                         />
//                         <div className="ml-1.5">
//                           <p className="font-semibold text-sm leading-none">
//                             {user.displayName}
//                           </p>
//                           <p className="text-xs">
//                             <a
//                               href={`https://www.curation.space/${user.uid}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="hover:text-blue-500"
//                             >
//                               @{user.uid}
//                             </a>
//                           </p>
//                         </div>
//                       </div>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <ChevronDown className="h-4 w-4"></ChevronDown>d
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-40">
//                           <DropdownMenuGroup>
//                             <DropdownMenuItem>
//                               <a
//                                 href="https://curation.space/"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="w-full flex items-center justify-start font-normal"
//                               >
//                                 <UserCircleIcon className="h-4 w-4 mr-1.5 text-black" />
//                                 Profile
//                               </a>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <a
//                                 href="https://curation.space"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="w-full flex items-center justify-start font-normal"
//                               >
//                                 <Cog6ToothIcon className="h-4 w-4 mr-1.5 text-black" />
//                                 Account
//                               </a>
//                             </DropdownMenuItem>
//                           </DropdownMenuGroup>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuGroup>
//                             <DropdownMenuItem>
//                               <a
//                                 href="https://curation.space"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="w-full flex items-center justify-start font-normal"
//                               >
//                                 <SignalIcon className="w-4 h-4 mr-1.5 text-black" />
//                                 Feed Manager
//                               </a>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <a
//                                 href="https://curation.space"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="w-full flex items-center justify-start font-normal"
//                               >
//                                 <Square3Stack3DIcon className="w-4 h-4 mr-1.5 text-black" />
//                                 Curation Station
//                               </a>
//                             </DropdownMenuItem>
//                           </DropdownMenuGroup>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuGroup>
//                             <DropdownMenuItem className="py-0">
//                               <Button
//                                 className="font-normal text-sm px-0 justify-start w-full"
//                                 size="sm"
//                                 variant="ghost"
//                                 onClick={handleLogout}
//                               >
//                                 Logout
//                               </Button>
//                             </DropdownMenuItem>
//                           </DropdownMenuGroup>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   )}
//                   <div className="mx-auto w-5/6 mt-2">
//                     {activeViewTab === 'login' && <Login setUser={setUser} />}
//                     {activeViewTab === 'push_to_content_list' &&
//                       user !== null && (
//                         <PushToContentList
//                           ownerUid={user.uid}
//                           setShowOverlay={(overlayTitle: string) => {
//                             setShowOverlay(true);
//                             setOverlayTitle(overlayTitle);
//                           }}
//                         />
//                       )}
//                   </div>
//                 </main>
//                 <footer className="text-center mt-6">
//                   <div className="bg-gray-100 p-2.5 flex justify-between">
//                     <div>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() =>
//                           window.open('https://www.curation.space', '_blank')
//                         }
//                       >
//                         Open the web app
//                       </Button>
//                     </div>
//                     <div className="flex items-center">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <a
//                               className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
//                               href="https://www.curation.space"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               <QuestionMarkIcon className="w-4 h-4" />
//                             </a>
//                           </TooltipTrigger>
//                           <TooltipContent side="top">FAQ</TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <a
//                               className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
//                               href="https://www.curation.space"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               <InfoCircledIcon className="w-4 h-4" />
//                             </a>
//                           </TooltipTrigger>
//                           <TooltipContent side="top">About</TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                 </footer>
//               </div>
//             </div>
//           </IFrameContext.Provider>,
//           bodyRef
//         )}
//     </div>
//   );
// };

// // const App = () => {
// //   return (
// //     <IFrame src="about:blank" className="h-full w-full">
// //       <div className="fixed inset-0 z-100 w-full h-full flex justify-end">
// //         <div className="min-w-80 bg-white border-l-2 border-gray-200 shadow-md">
// //           <AppContent />
// //         </div>
// //       </div>
// //     </IFrame>
// //   );
// // };

// // interface IFrameProps extends IframeHTMLAttributes<HTMLIFrameElement> {
// //   children?: ReactNode;
// // }

// // const IFrame: React.FC<IFrameProps> = ({ children, ...props }) => {
// //   const [mountNode, setMountNode] = useState(null);
// //   const iframeRef = useRef(null);
// //   const [iframeDoc, setIframeDoc] = useState<Document | null>(null);

// //   useEffect(() => {
// //     if (iframeRef.current) {
// //       //@ts-ignore
// //       // const iframeBody = iframeRef.current.contentWindow.document.body;
// //       // setMountNode(iframeBody);

// //       // Add the CSS file to the iframe's document head
// //       //@ts-ignore
// // const iframeHead = iframeRef.current.contentWindow.document.head;
// // const linkA = document.createElement('link');
// // const linkB = document.createElement('link');
// // linkA.rel = 'stylesheet';
// // linkB.rel = 'stylesheet';
// // linkA.href = chrome.runtime.getURL('content.style.css');
// // linkB.href = chrome.runtime.getURL('processed-tailwind.css');
// // iframeHead.appendChild(linkA);
// // iframeHead.appendChild(linkB);

// //       //@ts-ignore
// //       setIframeDoc(iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document);
// //     }
// //   }, []);

// //   return (
// //     <iframe {...props} ref={iframeRef}>
// //       {/* @ts-ignore */}
// //       {iframeDoc && createPortal(children, iframeDoc)}
// //     </iframe>
// //   );
// // };

// // const App = () => {
// //   return (
// //     <IFrame src="about:blank" className="h-full w-full">
// // <div className="fixed inset-0 z-100 w-full h-full flex justify-end">
// //   <div className="min-w-80 bg-white border-l-2 border-gray-200 shadow-md">
// //     <AppContent />
// //   </div>
// // </div>
// //     </IFrame>
// //   );
// // };

// export default App;
