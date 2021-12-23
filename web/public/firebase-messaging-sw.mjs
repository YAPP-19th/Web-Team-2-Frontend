import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBQ2hhmKBy2S00dMIl1XTnGQbzKasSbVwY',
  authDomain: 'dotoriham-dfee3.firebaseapp.com',
  projectId: 'dotoriham-dfee3',
  storageBucket: 'dotoriham-dfee3.appspot.com',
  messagingSenderId: '1055811077974',
  appId: '1:1055811077974:web:08286bc1990346256cb8f7',
  measurementId: 'G-BZE4CWPKM3',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
