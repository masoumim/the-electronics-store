// account-info.js - This component gets the currently signed in user and displays their account info

'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import { checkBackendSignIn, getUserInfo, signOutBackend, deleteUserBackend } from "../api/api";
const auth = getFirebaseAuth();

export default function AccountInfo() {
    const [user, setUser] = useState({});
    const router = useRouter();

    // Get current signed-in user on page load
    useEffect(() => {
        async function fetchData() {
            console.log('account-info.js useEffect() called');

            // Get the current signed-in user
            // *currentUser will return the current user after sign-in
            const user = auth.currentUser;

            if (user) {
                console.log(`account-info.js called! auth.currentUser found = `);
                console.log(user);

                // Confirm user is signed in on the backend                
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
                    returnedUser.firstName = fetchedUserInfo.first_name;
                    returnedUser.lastName = fetchedUserInfo.last_name;

                    setUser(returnedUser);
                }
            } else {
                // Get the current signed-in user using onAuthStateChanged
                // *onAuthStateChanged will execute in this case when user closes / refreshes the 
                // browser window and they are still logged in on the frontend
                onAuthStateChanged(auth, async (user) => {
                    console.log('account-info.js - onAuthStateChange() called!')
                    if (user) {
                        console.log('signed-in user onAuthStateChange found!');

                        // Check that user is signed-in in the backend
                        console.log('onAuthStateChange() - calling checkBackendSignIn()')
                        const backendUser = await checkBackendSignIn();

                        // Set the User state variable                        
                        if (backendUser) {
                            // Get user info from the backend
                            console.log('onAuthStateChange() - backendUser found - calling getUserInfo()');
                            const fetchedUserInfo = await getUserInfo();
                            console.log('fetchedUserInfo = ');
                            console.log(fetchedUserInfo);

                            // Set the User state variable
                            const returnedUser = {}
                            returnedUser.uid = user.uid;
                            returnedUser.email = user.email;
                            returnedUser.firstName = fetchedUserInfo.first_name;
                            returnedUser.lastName = fetchedUserInfo.last_name;

                            setUser(returnedUser);
                        }
                    }
                    else {
                        // No signed-in user found
                        console.log(`No signed-in user found! Redirecting to /sign-in`);
                        router.push('/sign-in');
                    }
                })
            }
        }
        fetchData();
    }, [])

    // Sign Out
    async function signUserOut() {
        console.log('signUserOut() called!');
        // Sign out of Firebase Auth
        signOut(auth).then(async () => {
            // Sign-out successful.

            // Sign out of Backend
            console.log('calling signOutBackend()')
            await signOutBackend();
            console.log('back from signOutBackend()')

            // Redirect to home
            router.push('/');
        }).catch((error) => {
            // An error happened.
        });
    }

    // Delete user
    async function deleteAccount() {
        // Delete user on Firebase Auth (Frontend)
        const user = auth.currentUser;

        console.log(`deleteAccount() called! user.uid = `);
        console.log(user.uid);

        // Call the Firebase Auth delete user function        
        deleteUser(user).then(async ()=>{
            // User deleted
            // Delete user from backend
            console.log('calling deleteUserBackend(user.uid) where user.uid = ');
            console.log(user.uid);
            await deleteUserBackend(user.uid);
            // Redirecting back to home
            router.push('/');
        }).catch((error)=>{
            console.log(error);
            throw error;
        })
    }

    return (
        <>
            <p>User uid: {user.uid}</p>
            <p>Email: {user.email}</p>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <button onClick={signUserOut}>Sign Out</button>
            <p/>
            <button onClick={deleteAccount}>Delete Account</button>
        </>
    )
}