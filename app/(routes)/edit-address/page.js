// This component establishes the route /edit-address which will display a form for editing an address.
import 'server-only'

import AddressForm from '@/app/components/address-form'

export default function EditAddressPage(){
    return(
        <>
        <AddressForm formType={"edit"}/>
        </>
    )
}