// This component establishes the route /order-history which will display a list of all orders placed by the user.
import 'server-only'

import OrderHistory from '@/app/components/order-history'

export default function OrderHistoryPage(){
    return(
        <>            
            <OrderHistory />
        </>
    )
}