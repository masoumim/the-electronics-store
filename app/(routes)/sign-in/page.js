// This component establishes the route /sign-in which will display a sign-in form.
import 'server-only'
import SignInForm from '@/app/components/sign-in-form'

export default function SignInOrRegisterPage() {
    return (
        <>
            <SignInForm />            
        </>
    )
}