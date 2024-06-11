import firebase from 'firebase' 
import  'firebase/auth';
import 'firebase/storage'
import 'firebase/firebase'


const firebaseConfig = {
    apiKey: "AIzaSyB4hLchwWM0SAP09moqE5K1MJiOYYp5FKQ",
    authDomain: "olx-app-9cf08.firebaseapp.com",
    projectId: "olx-app-9cf08",
    storageBucket: "olx-app-9cf08.appspot.com",
    messagingSenderId: "19195364113",
    appId: "1:19195364113:web:d6bc581a3115723655c2b0"
  };


export default firebase.initializeApp(firebaseConfig);

