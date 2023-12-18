// Route Handler for route: /route-handlers/sign-in
import 'server-only'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from '@/app/firebase/config';
const auth = getFirebaseAuth();

export async function POST(request) {
    const req = await request.json();
    const result = await signInWithEmailAndPassword(auth, req.email, req.password);    
    return Response.json(result);    
}