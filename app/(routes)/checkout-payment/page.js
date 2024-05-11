// This component establishes the route /checkout-payment which will display the payment information for checkout.
import 'server-only'

import CheckoutPayment from '@/app/components/checkout-payment'

export default function CheckoutPaymentPage() {
    return (
        <>
            <CheckoutPayment/>
        </>
    )
}