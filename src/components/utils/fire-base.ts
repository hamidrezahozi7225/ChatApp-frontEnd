// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCOi2ZUXpdTrCiXJUrDwncCjkMTCK1ClSE',
  authDomain: 'realimage-7e4b3.firebaseapp.com',
  projectId: 'realimage-7e4b3',
  storageBucket: 'realimage-7e4b3.appspot.com',
  messagingSenderId: '719579100571',
  appId: '1:719579100571:web:946a528058279361bd9d3e',
  measurementId: 'G-H3VH29MT0R',
};

// Initialize Firebase
const appInitials = initializeApp(firebaseConfig);
export default appInitials;
