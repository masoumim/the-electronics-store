import 'server-only'

// Route Handler for route: /route-handlers/register
// Register a new user
export async function POST(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the user registration info from the request body
    const bodyData = await request.json();

    // Call the backend /register route and send the user registration info to the route
    const res = await fetch(`${apiBaseURL}/register`, { method: "POST", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}