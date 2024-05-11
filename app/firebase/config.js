// This file sets up a firebase configuration and initializes the Firebase App instance. It also exports a function that returns the Auth instance associated with the Firebase App.
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

export function getFirebaseAuth() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDERID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
    };

    // Creates and initializes a Firebase App instance
    initializeApp(firebaseConfig);

    // Returns the Auth instance associated with the Firebase App
    const auth = getAuth();

    return auth;
}
