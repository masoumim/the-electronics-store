import 'server-only'

// Route Handlers for route: /route-handlers/primary-shipping-address

// GET - Fetches the users' primary shipping address from the backend
export async function GET(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend route
    const res = await fetch(`${apiBaseURL}/account/primary-address`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();
    return Response.json(data);
}

// POST - Add primary shipping address
export async function POST(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the address info from the request body
    const bodyData = await request.json();

    // Call the backend /account/primary-address route and send the address info to the route
    const res = await fetch(`${apiBaseURL}/account/primary-address`, { method: "POST", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    
    const data = await res.json();
    return Response.json(data);
}

// PUT - Edits primary shipping address
export async function PUT(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the address info from the request body
    const bodyData = await request.json();

    // Call the backend /account/primary-address route and send the address info to the route
    const res = await fetch(`${apiBaseURL}/account/primary-address`, { method: "PUT", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}