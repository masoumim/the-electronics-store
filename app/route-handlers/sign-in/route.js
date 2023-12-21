// Route Handler for route: /route-handlers/sign-in
import 'server-only'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirebaseAuth } from '@/app/firebase/config';
import { sendIdToken } from '@/app/api/api';
const auth = getFirebaseAuth();


// export async function POST(request) {
//     const req = await request.json();
//     console.log(req);
//     // Sign into Firebase Auth
//     const result = signInWithEmailAndPassword(auth, req.email, req.password)
//         .then(response => response)
//         .then(userCredentials => {
//             // Send the user's idToken to the Express.js backend API for server-side authentication
//             sendIdToken(userCredentials._tokenResponse.idToken);
//         })
//         .catch((error) => {
//             throw error;
//         })    
//     return Response.json(result);
// }


// export async function POST(request) {
//     const req = await request.json();
//     signInWithEmailAndPassword(auth, req.email, req.password)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             console.log("User signed in");
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             throw error;
//         });
//     return Response.json("User signed in");
// }


export async function POST(request) {
    const req = await request.json();

    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return signInWithEmailAndPassword(auth, req.email, req.password);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    return Response.json("User signed in");
}