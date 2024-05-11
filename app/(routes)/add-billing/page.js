// This component establishes the route /add-billing which will display a form to add a new billing address.
import 'server-only'

import BillingForm from '@/app/components/billing-form'

export default function AddBillingPage() {
    return (
        <>
            {/* We pass in a formType to indicate if we are adding or editing */}
            <BillingForm formType={"add"} />
        </>
    )
}