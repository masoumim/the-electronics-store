import 'server-only'

import AddressForm from '@/app/components/address-form'

export default function EditAddressPage(){
    return(
        <>
        <AddressForm formType={"edit"}/>
        </>
    )
}