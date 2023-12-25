import 'server-only'

// Route Handler for route: /route-handlers/signout-backend
// Signs the user out of the backend server by setting the 'authenticatedUser' object to null
export async function GET(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Call the endpoint
    const res = await fetch(`${apiBaseURL}/sign-out`);
    if (!res.ok) {
        throw new Error('Failed to sign user out')
    }
    const data = await res.json();
    return Response.json(data);
}