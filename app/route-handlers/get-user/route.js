import 'server-only'

import { getFirebaseAuth } from '@/app/firebase/config';
const auth = getFirebaseAuth();

// Route Handler for route: /route-handlers/get-user
export async function GET() {
    let response = "";
    const user = auth.currentUser;
    if (user) {
        response = user.email;
    }
    else {
        response = "no user signed in";
    }
    return Response.json(response);
}