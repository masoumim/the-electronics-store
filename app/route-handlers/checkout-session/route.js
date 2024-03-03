import 'server-only'

// Route Handlers for route: /route-handlers/checkout-session

// GET - Fetches the users' Checkout session from the backend
export async function GET(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend route
    const res = await fetch(`${apiBaseURL}/checkout`);
    if (!res.ok) {
        throw new Error('No Checkout Found');
    }
    const data = await res.json();
    return Response.json(data);
}

// POST - Create a Checkout Session
export async function POST(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend POST /checkout route which will create a Checkout Session on the db
    const res = await fetch(`${apiBaseURL}/checkout`, { method: "POST" })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}

// PUT - Update the Checkout Session Stage
export async function PUT(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the address info from the request body
    const bodyData = await request.json();

    // Call the backend PUT /checkout route which will update the Checkout Session Stage
    const res = await fetch(`${apiBaseURL}/checkout/stage/stage-name`, { method: "PUT", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}