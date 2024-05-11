// This component establishes the route /checkout-billing which will display the billing information for checkout.
import 'server-only'

import CheckoutBilling from '@/app/components/checkout-billing'

export default function CheckoutBillingPage() {
    return (
        <>
            <CheckoutBilling/>
        </>
    )
}