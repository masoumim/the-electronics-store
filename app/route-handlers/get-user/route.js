// Route Handler for route: /route-handlers/get-user
import 'server-only'
import { getFirebaseAuth } from '@/app/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
const auth = getFirebaseAuth();

// export async function GET() {    
//     let response = "No user signed in"
//     const user = auth.currentUser;
//     if (user) {        
//         response = user.email;     
//     }    
//     return Response.json(response);
// }

let userEmail = ""

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        userEmail = user.email;
    } else {
        // User is signed out
        userEmail = "no user signed in"
    }
});


export async function GET() {
    console.log(`/get-user route handler: ${userEmail}`);

       
    return Response.json(userEmail);
}
