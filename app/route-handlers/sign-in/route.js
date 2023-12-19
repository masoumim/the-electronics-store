// Route Handler for route: /route-handlers/sign-in
import 'server-only'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from '@/app/firebase/config';
import { sendIdToken } from '@/app/api/api';
const auth = getFirebaseAuth();

export async function POST(request) {
    const req = await request.json();
    const result = await signInWithEmailAndPassword(auth, req.email, req.password);

    // Get the signed in user's ID Token and send it to the backend API to identify the user server-side.
    auth.currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        // Send token to your backend via HTTPS
        sendIdToken(idToken).then((response) => {
            console.log(response);
        })


    }).catch(function (error) {
        // Handle error        
        return Response.json(error);
    });



    return Response.json(result);
}