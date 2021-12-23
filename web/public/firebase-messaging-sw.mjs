import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBQ2hhmKBy2S00dMIl1XTnGQbzKasSbVwY',
  projectId: 'dotoriham-dfee3',
  messagingSenderId: '1055811077974',
  appId: '1:1055811077974:web:08286bc1990346256cb8f7',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
