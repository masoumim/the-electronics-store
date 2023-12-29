// account-info.js - This component gets the currently signed in user and displays their account info

'use client'
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import { getUserInfo } from "../api/api";
const auth = getFirebaseAuth();

export default function AccountInfo() {
    const [firstName, setFirstName] = useState("User First Name");
    const [user, setUser] = useState([]);

    // // Get current logged in user on page load
    // useEffect(() => {
    //     onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             // Get user info from the backend
    //             // const fetchedUserInfo = await getUserInfo();

    //             // const returnedUser = {}
    //             // returnedUser.uid = user.uid;
    //             // returnedUser.firstName = fetchedUserInfo.firstName;
    //             // returnedUser.lastName = fetchedUserInfo.lastName;
    //             // returnedUser.email = fetchedUserInfo.email;

    //             setUser([user.uid, user.email]);
    //         } else {
    //             // User is signed out                
    //         }
    //     });
    // }, [user])

    // // Get user info the backend
    // useEffect(() => {
    //     async function fetchData() {
    //         const fetchedUserInfo = await getUserInfo();
    //     }
    //     fetchData();
    // },[]);

    // return (
    //     <>
    //         <p>User: {user}</p>
    //         <p>First Name: {firstName}</p>
    //     </>
    // )

    return(
        <>
        <p>Account Info Here</p>
        </>
    )
}