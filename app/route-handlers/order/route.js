import 'server-only'

// Route Handlers for route: /route-handlers/order

// GET Order

// POST Order
export async function POST(request) {
    const bodyData = await request.json();
    console.log(bodyData);
    
    // TODO: Create the Order (call the backend POST /orders/create)



    return Response.json(session);
}
