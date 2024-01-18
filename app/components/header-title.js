// header-title-logo.js - This component renders static elements of the header (title, logo)

import 'server-only'

import Link from 'next/link'

export default function HeaderTitle() {
    return (
        <>
            <Link href={"/"}>The Electronics Store</Link>
            <p>*logo goes here*</p>
        </>
    )
}