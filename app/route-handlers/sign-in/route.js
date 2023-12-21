// Route Handler for route: /route-handlers/sign-in
import 'server-only'
import { signInWithEmailAndPassword } from 'firebase/auth';
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


export async function POST(request) {
    const req = await request.json();
    signInWithEmailAndPassword(auth, req.email, req.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw error;
        });
    return Response.json("User signed in");
}