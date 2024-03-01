// import { useSyncExternalStore } from 'react';

// export const useLocalStorage = () => {
//   const item = useSyncExternalStore(subscribe, getSnapshot, () => undefined);

//   // Parse the json string
//   // You should probably further narrow down the JSON.parse type because JSON.parse returns any
//   const value = typeof item === 'string' ? JSON.parse(item) : null;

//   const setValue = () => {
//     localStorage.setItem('item', JSON.stringify('new-value'));
//     //The event name has to match the eventListeners defined in the subscribe function
//     window.dispatchEvent(new StorageEvent('custom-storage-event-name'));
//   };

//   return [value, setValue] as const;
// };

// function subscribe(callback: () => void) {
//   window.addEventListener('custom-storage-event-name', callback);
//   return () => {
//     window.removeEventListener('custom-storage-event-name', callback);
//   };
// }

// //Return the current value from the browser API
// function getSnapshot(key: string) {
//   //alert("localStorage changed")
//   return localStorage.getItem(key);
// }
