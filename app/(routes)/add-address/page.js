// This component establishes the route /add-address which will display a form to add a new address.
import 'server-only'

import AddressForm from '@/app/components/address-form'

export default function AddAddressPage() {
    return (
        <>
            {/* We pass in a formType to indicate if we are adding or editing */}
            <AddressForm formType={"add"} />
        </>
    )
}