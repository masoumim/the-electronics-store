import 'client-only'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirebaseAuth } from './config';
const auth = getFirebaseAuth();


// Get current signed in user
export async function getUser() {
  const res = await fetch('route-handlers/get-user');
  return res.json();
}

// Register user
export async function registerUser(email, password) {
  await fetch('route-handlers/register', { method: 'POST', body: JSON.stringify({ email: email, password: password }) });
}

// Sign In
export async function signInUser(email, password) {
  // const res = await fetch('route-handlers/sign-in', { method: 'POST', body: JSON.stringify({ email: email, password: password }) });
  // return res.json();

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
  });
}
