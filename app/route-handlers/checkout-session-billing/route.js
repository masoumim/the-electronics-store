import 'server-only'

// Route Handlers for route: /route-handlers/checkout-session-billing


// POST - Add the user's Billing Address ID to the Checkout Session
export async function POST(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
    const billingAddressID = searchParams.get('billing_address');

    // Call the backend POST /checkout/billing/addressID
    const res = await fetch(`${apiBaseURL}/checkout/billing/${billingAddressID}`, { method: "POST" })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}

// PUT - Updates the Checkout Session's Billing Address
export async function PUT(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the address info from the request body
    const bodyData = await request.json();

    // Call the backend     
    const res = await fetch(`${apiBaseURL}/checkout/shipping/:addressId`, { method: "PUT", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}