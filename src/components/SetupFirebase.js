import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';  // <----
let firebaseApp;
SetupFirebase();

/**
* Firebase Initialization Function
* This must be called before any firebase query
*/
function SetupFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCtCg6Q8IQ4kDw8PXBoKySmcbH4VBGDoBY",
        authDomain: "bhanderimart.firebaseapp.com",
        projectId: "bhanderimart",
        storageBucket: "bhanderimart.appspot.com",
        messagingSenderId: "1001835560907",
        appId: "1:1001835560907:web:94ef4e85bff74a7061404e",
        measurementId: "G-2SS25J24LT"
    };
    // Initialize Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebaseApp;