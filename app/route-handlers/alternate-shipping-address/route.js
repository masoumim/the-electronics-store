import 'server-only'

// Route Handlers for route: /route-handlers/alternate-shipping-address

// GET - Fetches the users' alternate shipping address from the backend
export async function GET(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend route
    const res = await fetch(`${apiBaseURL}/checkout/shipping/alt-address`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();
    if (data) return Response.json(data);
}

// POST
export async function POST(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the address info from the request body
    const bodyData = await request.json();

    // Call the backend /checkout/shipping/alt-address route and send the address info to the route
    const res = await fetch(`${apiBaseURL}/checkout/shipping/alt-address`, { method: "POST", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}

// PUT