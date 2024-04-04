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

    const data = await res.json();

    // Check if the response is not ok
    if (!res.ok) {
        // Check if the error message is about an existing user
        if (data === "Registration failed. User with that email address already exists.") {
            // Handle this specific error message
            // You can replace this with any action you want to perform in this case
            console.error(data);
        }
        throw new Error(data);
    }

    return Response.json(data);
}


