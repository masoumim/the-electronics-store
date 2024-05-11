// account-info.js - This component gets the currently signed in user and displays their account info. Used in the /account page

'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, signOut, deleteUser, getAuth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import { checkBackendSignIn, getUserInfo, signOutBackend, deleteUserBackend, getPrimaryShippingAddress, getBillingAddress } from "../api/api";
import Link from "next/link";
const auth = getFirebaseAuth();

export default function AccountInfo() {
    const [user, setUser] = useState({});
    const [primaryShippingAddress, setPrimaryShippingAddress] = useState({});
    const [billingAddress, setBillingAddress] = useState({});
    const [showModal, setShowModal] = useState(false);
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
        const auth = getFirebaseAuth();
        const user = auth.currentUser;

        // Ask the user to input their password
        const password = prompt('Please enter your password to confirm this action');

        // If the password is null (the user clicked "Cancel"), do not proceed with the re-authentication
        if (password === null) {
            return;
        }

        // Reauthenticate the user
        const credential = EmailAuthProvider.credential(user.email, password);

        await reauthenticateWithCredential(user, credential);

        // Now the user is considered recently signed in and you can delete their account
        deleteUser(user).then(async () => {
            await deleteUserBackend(user.uid);
            router.push('/');
        }).catch((error) => {
            console.log(error);
            throw error;
        })
    }

    return (
        <div className="container mx-auto p-8">
            {/* Account Information Section */}
            <div className="bg-white rounded-md shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Account Information</h2>
                <p className="mb-2">
                    <span className="font-medium">User UID:</span> {user.uid}
                </p>
                <p className="mb-2">
                    <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="mb-2">
                    <span className="font-medium">First Name:</span> {user.firstName}
                </p>
                <p className="mb-2">
                    <span className="font-medium">Last Name:</span> {user.lastName}
                </p>
            </div>
            {/* Shipping and Billing Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-md shadow-md p-6">
                    {/* Primary Shipping Address */}
                    <h2 className="text-xl font-bold mb-4">Primary Shipping Address</h2>
                    {primaryShippingAddress.address ? (
                        <>
                            <p className="mb-2">
                                <span className="font-medium">Address:</span> {primaryShippingAddress.address}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Unit:</span> {primaryShippingAddress.unit}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">City:</span> {primaryShippingAddress.city}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Province:</span> {primaryShippingAddress.province}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Country:</span> {primaryShippingAddress.country}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Postal Code:</span> {primaryShippingAddress.postalCode}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Phone Number:</span> {primaryShippingAddress.phoneNumber}
                            </p>
                            <Link
                                href="/edit-address"
                                className="bg-blue-500 hover:bg-blue-700 text-center w-20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 block"
                            >
                                Edit
                            </Link>
                        </>
                    ) : (
                        <Link
                            href="/add-address"
                            className="bg-blue-500 hover:bg-blue-700 text-center w-20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 block"
                        >
                            Add
                        </Link>
                    )}
                </div>

                {/* Billing Address */}
                <div className="bg-white rounded-md shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Billing Address</h2>
                    {billingAddress.address ? (
                        <>
                            <p className="mb-2">
                                <span className="font-medium">Address:</span> {billingAddress.address}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Unit:</span> {billingAddress.unit}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">City:</span> {billingAddress.city}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Province:</span> {billingAddress.province}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Country:</span> {billingAddress.country}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Postal Code:</span> {billingAddress.postalCode}
                            </p>
                            <p className="mb-2">
                                <span className="font-medium">Phone Number:</span> {billingAddress.phoneNumber}
                            </p>
                            <Link
                                href="/edit-billing"
                                className="bg-blue-500 hover:bg-blue-700 text-center w-20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 block"
                            >
                                Edit
                            </Link>
                        </>
                    ) : (
                        <Link
                            href="/add-billing"
                            className="bg-blue-500 hover:bg-blue-700 text-center w-20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 block"
                        >
                            Add
                        </Link>
                    )}
                </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-md shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Account Actions</h2>
                <button
                    onClick={signUserOut}
                    className="bg-blue-500 hover:bg-blue-700 text-center w-40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mb-4"
                >
                    Sign Out
                </button>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-500 hover:bg-red-700 text-center w-40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mb-4"
                >
                    Delete Account
                </button>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                            <p className="text-lg mb-4 font-bold text-red-500">Are you sure you want to delete your account?</p>
                            <div className="flex justify-between">
                                <button onClick={deleteAccount} className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 w-52">Confirm</button>
                                <button onClick={() => setShowModal(false)} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-52">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                <Link
                    href="/order-history"
                    className="bg-blue-500 hover:bg-blue-700 text-center w-40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block"
                >
                    Order History
                </Link>
            </div>
        </div>
    )
}