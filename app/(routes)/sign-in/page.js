import 'server-only'
import SignInForm from '@/app/components/sign-in-form'
import Link from 'next/link'
export default function SignInOrRegisterPage() {
    return (
        <>
            <SignInForm />
            <Link href="/create-account">Create an Account</Link>
        </>
    )
}