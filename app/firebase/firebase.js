// firebase/firebase.js - This file contains client-side methods for interacting with the Firebase Auth App instance 
import 'client-only'
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from './config';
const auth = getFirebaseAuth();

// Get current signed in user
export async function getUser() {
  const user = auth.currentUser;
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    return user.email;
  } else {
    // No user is signed in.
  }
}

// Register user
export async function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw error;
    });
}

// Sign In
export async function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw error;
    });
}

// Sign Out
export async function signOutUser() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    throw error;
  });
}
