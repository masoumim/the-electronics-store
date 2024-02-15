// account-info.js - This component gets the currently signed in user and displays their account info. Used in the /account page

'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import { checkBackendSignIn, getUserInfo, signOutBackend, deleteUserBackend, getPrimaryShippingAddress, getBillingAddress } from "../api/api";
import Link from "next/link";
const auth = getFirebaseAuth();

export default function AccountInfo() {
    const [user, setUser] = useState({});
    const [primaryShippingAddress, setPrimaryShippingAddress] = useState({});
    const [billingAddress, setBillingAddress] = useState({});
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
                            const returnedUser = {};
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

    // Get the user's primary shipping address on page load
    useEffect(() => {
        async function fetchData() {
            // Fetch address                      
            const fetchedAddress = await getPrimaryShippingAddress();
            console.log('fetched address = ');
            console.log(fetchedAddress);

            if (fetchedAddress) {
                const addressObj = {};
                addressObj.address = fetchedAddress.address;
                addressObj.unit = fetchedAddress.unit;
                addressObj.city = fetchedAddress.city;
                addressObj.province = fetchedAddress.province;
                addressObj.country = fetchedAddress.country;
                addressObj.postalCode = fetchedAddress.postal_code;
                addressObj.phoneNumber = fetchedAddress.phone_number;
                setPrimaryShippingAddress(addressObj);
            }
        }
        fetchData();
    }, [])

    // Get the user's Billing address on page load
    useEffect(() => {
        async function fetchData() {
            // Fetch address                      
            const fetchedAddress = await getBillingAddress();
            console.log('fetched address = ');
            console.log(fetchedAddress);

            if (fetchedAddress) {
                const addressObj = {};
                addressObj.address = fetchedAddress.address;
                addressObj.unit = fetchedAddress.unit;
                addressObj.city = fetchedAddress.city;
                addressObj.province = fetchedAddress.province;
                addressObj.country = fetchedAddress.country;
                addressObj.postalCode = fetchedAddress.postal_code;
                addressObj.phoneNumber = fetchedAddress.phone_number;
                setBillingAddress(addressObj);
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
        deleteUser(user).then(async () => {
            // User deleted on frontend
            // Delete user from backend            
            await deleteUserBackend(user.uid);
            // Redirecting back to home
            router.push('/');
        }).catch((error) => {
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
            <p>=========================================</p>
            <p>Primary Shipping Address:</p>
            {/* If user has a primary shipping address, display the "edit button", otherwise display "Add" */}
            {primaryShippingAddress.address ?
                <>
                    <p>Address: {primaryShippingAddress.address}</p>
                    <p>Unit: {primaryShippingAddress.unit}</p>
                    <p>City: {primaryShippingAddress.city}</p>
                    <p>Province: {primaryShippingAddress.province}</p>
                    <p>Country: {primaryShippingAddress.country}</p>
                    <p>Postal Code: {primaryShippingAddress.postalCode}</p>
                    <p>Phone Number: {primaryShippingAddress.phoneNumber}</p>
                    <Link href={"/edit-address"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</Link>
                </>
                :
                <Link href={"/add-address"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</Link>
            }
            <p>=========================================</p>
            <br />
            <p>=========================================</p>
            <p>Billing Address:</p>
            {/* If user has a billing address, display the "edit button", otherwise display "Add" */}
            <p>*Display Billing address info here*</p>
            {billingAddress.address ?
                <>
                    <p>Address: {billingAddress.address}</p>
                    <p>Unit: {billingAddress.unit}</p>
                    <p>City: {billingAddress.city}</p>
                    <p>Province: {billingAddress.province}</p>
                    <p>Country: {billingAddress.country}</p>
                    <p>Postal Code: {billingAddress.postalCode}</p>
                    <p>Phone Number: {billingAddress.phoneNumber}</p>
                    <Link href={"/edit-billing"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</Link>
                </>
                :
                <Link href={"/add-billing"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</Link>
            }
            <p>=========================================</p>
            <button onClick={signUserOut}>Sign Out</button>
            <p />
            <button onClick={deleteAccount}>Delete Account</button>
        </>
    )
}