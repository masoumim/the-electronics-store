// Route Handler for route: /route-handlers/sign-out
import 'server-only'
import { signOut } from 'firebase/auth';
import { getFirebaseAuth } from '@/app/firebase/config';
const auth = getFirebaseAuth();

export async function GET() {
    await signOut(auth);    
    return Response.json("User signed out");
}