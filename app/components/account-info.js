// account-info.js - This component gets the currently signed in user and displays their account info

'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import { getUserInfo, signOutBackend } from "../api/api";
const auth = getFirebaseAuth();

export default function AccountInfo() {
    const [user, setUser] = useState({});
    const router = useRouter();

    // // Get current logged in user on page load
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Get user info from the backend
                const fetchedUserInfo = await getUserInfo();
                                
                const returnedUser = {}
                returnedUser.uid = user.uid;
                returnedUser.email = user.email;
                returnedUser.firstName = fetchedUserInfo.firstName;
                returnedUser.lastName = fetchedUserInfo.lastName;
                
                setUser(returnedUser);
            } else {
                // User is signed out
                // TODO: Redirect user to /sign-in ?            
            }
        });
    }, [])

    // // Get user info from the backend
    // useEffect(() => {
    //     async function fetchData() {
    //         const fetchedUserInfo = await getUserInfo();
    //     }
    //     fetchData();
    // },[]);

    function signUserOut() {
        // Sign out of Firebase Auth
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });

        // Sign out of Backend
        signOutBackend();

        // Redirect to /sign-in
        router.push('/sign-in');
    }

    return (
        <>
            <p>User uid: {user.uid}</p>
            <p>Email: {user.email}</p>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <button onClick={signUserOut}>Sign Out</button>

        </>
    )
}