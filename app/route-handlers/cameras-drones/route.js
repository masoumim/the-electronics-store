import 'server-only'

// Route Handlers for route: /route-handlers/cameras-drones

// GET /cameras-drones
export async function GET(request) {

    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the backend API to fetch cameras and drones
    const res = await fetch(`${apiBaseURL}/cameras-drones`, { method: "GET", headers: { "Content-Type": "application/json" } })

    // Check if the response is not OK
    if (!res.ok) {
        // Return a new Response object with an error status code and message
        console.log('Error fetching cameras and drones:', res.statusText);
        return new Response(`Error fetching cameras and drones: ${res.statusText}`, { status: res.status });
    }

    // Return the response from the backend API
    console.log('Cameras and drones fetched successfully');
    return res;
}