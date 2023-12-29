// firebase/firebase.js - This file contains client-side methods for interacting with the Firebase Auth App instance 
import 'client-only'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirebaseAuth } from './config';
import { sendIdToken, signOutBackend } from '../api/api';
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

// Sign In
export async function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // Authorize user on the backend server
      auth.currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        // Send token to your backend via HTTPS
        sendIdToken(idToken);
      }).catch(function (error) {                
        throw error;
      });      
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
    // Sign out user in the backend
    signOutBackend();
  }).catch((error) => {
    throw error;
  });
}
