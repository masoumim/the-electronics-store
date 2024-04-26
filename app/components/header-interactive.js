// header-interactive - This interactive component contains the sign in button, the account button and the cart button.

'use client'
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import Link from 'next/link'
import Image from 'next/image'
const auth = getFirebaseAuth();

export default function HeaderInteractive() {
    const [user, setUser] = useState();

    // Get current logged in user on page load
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const signedInUser = {}
                signedInUser.email = user.email;
                setUser(signedInUser);
            } else {
                setUser(null);
            }
        });
    }, [])

    return (
        <div className="flex justify-between items-center">
            {/* The logo and the name of the store */}
            <div className="flex items-center space-x-4">
                <Link href="/">
                    <Image src="/icons/logo-white.png" alt="The Electronics Store logo" width={30} height={30} />
                </Link>
                <Link href="/">
                    <div className="text-blue-500 font-bold">The Electronics Store</div>
                </Link>
            </div>
            {/* The account / sign-in link and the cart link */}
            <div className="flex items-center space-x-4">
                {/* If the user is signed in, render the profile icon along with "My Account. Otherwise, render "Sign In" */}
                {user ? (
                    <div className="flex items-center space-x-2">
                        <Link href="/account">
                            <Image
                                src="/icons/account-white.png"
                                alt="Profile Icon"
                                width={30}
                                height={30}
                            />
                        </Link>
                        <Link href="/account">Account</Link>
                    </div>
                ) : (
                    <Link href="/sign-in">Sign In</Link>
                )}
                <Link href="/cart">
                    <Image src="/icons/shopping-cart-white.png" alt="Shopping cart icon" width={30} height={30} />
                </Link>
                <Link href={'/cart'}>My Cart</Link>
            </div>
        </div>
    )
}
