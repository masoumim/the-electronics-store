// This component establishes the route /checkout-shipping which will display the shipping information for checkout.
import 'server-only'

import CheckoutShipping from '@/app/components/checkout-shipping'

export default function CheckoutShippingPage() {
    return (
        <>
            <CheckoutShipping/>
        </>
    )
}