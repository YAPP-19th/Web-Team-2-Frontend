/* eslint-disable no-undef */
import initializeApp from 'firebase/app';

importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

const config = {
  apiKey: 'AIzaSyBQ2hhmKBy2S00dMIl1XTnGQbzKasSbVwY',
  authDomain: 'dotoriham-dfee3.firebaseapp.com',
  projectId: 'dotoriham-dfee3',
  storageBucket: 'dotoriham-dfee3.appspot.com',
  messagingSenderId: '1055811077974',
  appId: '1:1055811077974:web:08286bc1990346256cb8f7',
  measurementId: 'G-BZE4CWPKM3',
};

initializeApp(config);
