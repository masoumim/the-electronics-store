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
    return Response.json(data);
}