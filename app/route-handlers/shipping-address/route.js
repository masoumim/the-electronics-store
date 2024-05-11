import 'server-only'

// Route Handlers for route: /route-handlers/shipping-address
// This just fetches a shipping address from the backend by userId + addressId

// GET - Fetches the users' shipping address from the backend
export async function GET(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the userId and addressId from the request
    const userId = searchParams.get('userId');
    const addressId = searchParams.get('addressId');

    // Call the backend route
    const res = await fetch(`${apiBaseURL}/address/${userId}/${addressId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    if (data) return Response.json(data);
}