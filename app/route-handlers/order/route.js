import 'server-only'

// Route Handlers for route: /route-handlers/order

// GET Order (No.. there is no backend route for this. Do I even need it?)

// POST Order
export async function POST(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend API to create an order
    const res = await fetch(`${apiBaseURL}/orders/create`, { method: "POST", headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.statusText;
    }

    // Return a new Response object with a success status code and message
    return new Response('Order created successfully', { status: 200 });
}
