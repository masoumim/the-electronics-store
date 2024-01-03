// account-info.js - This component gets the currently signed in user and displays their account info

'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import { checkBackendSignIn, getUserInfo, signOutBackend } from "../api/api";
const auth = getFirebaseAuth();

export default function AccountInfo() {
    const [user, setUser] = useState({});
    const router = useRouter();

    // Get current logged in user on page load
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(`account-info.js called! signed in user found = `);
                console.log(user);

                // Confirm user is signed in on the backend
                // TODO: Call the backend route when it is finished. It will return whether a user
                // has been signed in on the backend. If so, continue to next step (getUserInfo()).
                // otherwise, return from this observer / or / don't run the following code - either or.
                console.log('checking if user is signed in on backend:');
                const backendUser = await checkBackendSignIn();
                console.log('backendUser = ');
                console.log(backendUser);
                if (backendUser) {
                    // Get user info from the backend
                    console.log(`calling getUserInfo()`)
                    const fetchedUserInfo = await getUserInfo();
                    console.log(`back from getUserInfo()`);

                    console.log(`fetchedUserInfo =`);
                    console.log(fetchedUserInfo);

                    const returnedUser = {}
                    returnedUser.uid = user.uid;
                    returnedUser.email = user.email;
                    returnedUser.firstName = fetchedUserInfo.firstName;
                    returnedUser.lastName = fetchedUserInfo.lastName;

                    setUser(returnedUser);
                }
                else{
                    // Sign out user
                    signUserOut();
                }


                // // Get user info from the backend
                // console.log(`calling getUserInfo()`)
                // const fetchedUserInfo = await getUserInfo();
                // console.log(`back from getUserInfo()`);

                // console.log(`fetchedUserInfo =`);
                // console.log(fetchedUserInfo);


                // const returnedUser = {}
                // returnedUser.uid = user.uid;
                // returnedUser.email = user.email;
                // returnedUser.firstName = fetchedUserInfo.firstName;
                // returnedUser.lastName = fetchedUserInfo.lastName;

                // setUser(returnedUser);
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

    async function signUserOut() {
        // Sign out of Firebase Auth
        signOut(auth).then(async () => {
            // Sign-out successful.

            // Sign out of Backend
            console.log('calling signOutBackend()')
            await signOutBackend();
            console.log('back from signOutBackend()')

            // Redirect to /sign-in
            router.push('/sign-in');
        }).catch((error) => {
            // An error happened.
        });

        // // Sign out of Backend
        // console.log('calling signOutBackend()')
        // await signOutBackend();
        // console.log('back from signOutBackend()')

        // // Redirect to /sign-in
        // router.push('/sign-in');
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