'use client'
import { useEffect, useState } from "react"
import { registerUser, signInUser, signOutUser, getUser } from "../firebase/firebase"
import { getFirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
const auth = getFirebaseAuth();

export default function AuthTest() {
    const [user, setUser] = useState("");

    // Get current logged in user on page load
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                setUser(user.email);
            } else {
                // User is signed out                
            }
        });
    }, [user])

    return (
        <>
            <p>Auth Test</p>
            <button onClick={() => registerUser('foo@bar.com', 'Foo1234567!')}>Register</button>
            <p />
            <button onClick={() => signInUser("foo@bar.com", "Foo1234567!")}>Sign In</button>
            <p />
            <button onClick={signOutUser}>Sign Out</button>
            <p>Signed in user: {user}</p>
        </>
    )
}