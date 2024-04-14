// navbar.js - This interactive component contains drop-down menus for each of the product categories

'use client'

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/computers">Computers</Link>
                </li>
                <li>
                    <Link href="/gaming">Gaming</Link>
                </li>
                <li>
                    <Link href="/home-electronics">Home Electronics</Link>
                </li>
                <li>
                    <Link href="/cameras-drones">Cameras & Drones</Link>
                </li>
            </ul>
        </nav>
    )
}