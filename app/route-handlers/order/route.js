import 'server-only'

// Route Handlers for route: /route-handlers/order

// GET Order (No.. there is no backend route for this. Do I even need it?)

// POST Order
export async function POST(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend
    console.log('!!! calling /orders/create on backend !!!');
    console.log(`apiBaseURL = ${apiBaseURL}`);
    const res = await fetch(`${apiBaseURL}/orders/create`, { method: "POST", headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.statusText;
    }

    const data = await res.json();
    return Response.json(data);
}
