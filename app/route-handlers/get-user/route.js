// Route Handler for route: /route-handlers/get-user
import 'server-only'
import { getFirebaseAuth } from '@/app/firebase/config';
const auth = getFirebaseAuth();

export async function GET() {
    let response = {};
    const user = auth.currentUser;
    if (user) {
        response.user = user.email
    }
    else {
        response = "no user signed in";
    }
    return Response.json(JSON.stringify(response));
}