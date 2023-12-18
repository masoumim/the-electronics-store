import 'server-only'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

export function getFirebaseAuth() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_APIKEY,
        authDomain: process.env.FIREBASE_AUTHDOMAIN,
        projectId: process.env.FIREBASE_PROJECTID,
        storageBucket: process.env.FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
        appId: process.env.FIREBASE_APPID
    };

    // Creates and initializes a Firebase App instance
    const app = initializeApp(firebaseConfig);

    // Returns the Auth instance associated with the Firebase App
    const auth = getAuth();

    return auth;
}
