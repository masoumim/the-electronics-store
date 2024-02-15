import 'server-only'

import BillingForm from '@/app/components/billing-form'

export default function EditBillingPage(){
    return(
        <>
        <BillingForm formType={"edit"}/>
        </>
    )
}