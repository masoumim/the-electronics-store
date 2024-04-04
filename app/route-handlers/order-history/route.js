import 'server-only'

// Route Handlers for route: /route-handlers/order-history

// GET /order-history
export async function GET(request) {

    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend API to get the order history
    const res = await fetch(`${apiBaseURL}/orders`, { method: "GET", headers: { "Content-Type": "application/json" } })

    // Check if the response is not OK
    if (!res.ok) {
        // If the status code is 404, return an empty array
        if (res.status === 404) {
            console.log('No order history found for this user');
            return new Response(JSON.stringify([]), { status: 200 });
        }

        // Return a new Response object with an error status code and message
        console.log('Error fetching order history:', res.statusText);
        return new Response(`Error fetching order history: ${res.statusText}`, { status: res.status });
    }

    // Parse the response to JSON
    const orderHistory = await res.json();

    // Return a new Response object with a success status code and the order history
    console.log('Order history fetched successfully');
    return new Response(JSON.stringify(orderHistory), { status: 200 });
}