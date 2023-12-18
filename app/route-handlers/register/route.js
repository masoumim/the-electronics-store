import 'server-only'

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from '@/app/firebase/config';
const auth = getFirebaseAuth();

// Route Handler for route: /route-handlers/register
export async function POST(request) {
    const req = await request.json();
    const result = await createUserWithEmailAndPassword(auth, req.email, req.password);
    return Response.json(result);
}