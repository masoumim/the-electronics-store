import 'server-only'

// Route Handlers for route: /route-handlers/order

// POST /orders/create
export async function POST(request) {

    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend API to create an order
    const res = await fetch(`${apiBaseURL}/orders/create`, { method: "POST", headers: { "Content-Type": "application/json" } })

    // Check if the response is not OK
    if (!res.ok) {
        // Return a new Response object with an error status code and message
        console.log('Error creating order:', res.statusText);
        return new Response(`Error creating order: ${res.statusText}`, { status: res.status });
    }

    // Return a new Response object with a success status code and message
    console.log('Order created successfully');
    return new Response('Order created successfully', { status: 200 });
}