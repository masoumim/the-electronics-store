import 'server-only'

// Route Handlers for route: /route-handlers/home-electronics

// GET /home-electronics
export async function GET(request) {

    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend API to fetch home electronics products
    const res = await fetch(`${apiBaseURL}/home-electronics`, { method: "GET", headers: { "Content-Type": "application/json" } })

    // Check if the response is not OK
    if (!res.ok) {
        // Return a new Response object with an error status code and message
        console.log('Error fetching home electronics products:', res.statusText);
        return new Response(`Error fetching home electronics products: ${res.statusText}`, { status: res.status });
    }

    // Return the response from the backend API
    console.log('Home electronics products fetched successfully');
    return res;
}