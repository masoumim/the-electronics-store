import 'server-only'

// Route Handlers for route: /route-handlers/checkout-session-shipping

// POST - Add the user's Shipping Address ID to the Checkout Session
export async function POST(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
    const shippingAddressID = searchParams.get('shipping_address');

    // Call the backend POST /checkout/shipping/addressID
    const res = await fetch(`${apiBaseURL}/checkout/shipping/${shippingAddressID}`, { method: "POST" })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}

// PUT - Updates the Checkout Session's Shipping Address
export async function PUT(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the address info from the request body
    const bodyData = await request.json();

    // Call the backend 
    // const res = await fetch(`${apiBaseURL}/checkout/shipping/:addressId`, { method: "PUT", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    const res = await fetch(`${apiBaseURL}/checkout/shipping/:addressId`, { method: "PUT", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}