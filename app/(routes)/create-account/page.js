// This component establishes the route /create-account which will display a registration form.
import 'server-only'
import RegistrationForm from '@/app/components/registration-form'
export default function CreateAccountPage() {
    return (
        <>
            <RegistrationForm />
        </>
    )
}