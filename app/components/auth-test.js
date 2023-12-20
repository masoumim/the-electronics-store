'use client'

import { useEffect, useState } from "react"
import { registerUser, signInUser, signOutUser, getUser } from "../firebase/firebase"

export default function AuthTest() {
    const [user, setUser] = useState("");

    // Get current logged in user
    useEffect(() => {
        async function getData() {
            const signedInUser = await getUser();
            if (signedInUser) setUser(signedInUser);
        }
        getData();
    })

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