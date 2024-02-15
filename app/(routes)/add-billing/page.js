import 'server-only'

import BillingForm from '@/app/components/billing-form'

export default function AddBillingPage(){
    return(
        <>
        <BillingForm formType={"add"}/>
        </>
    )
}