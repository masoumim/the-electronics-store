// This component establishes the route /edit-billing which will display a form to edit billing information.
import 'server-only'

import BillingForm from '@/app/components/billing-form'

export default function EditBillingPage(){
    return(
        <>
        <BillingForm formType={"edit"}/>
        </>
    )
}