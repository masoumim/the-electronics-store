import 'server-only'

// Route Handler for route: /route-handlers/sign-in-new-backend
// Sign-in a newly added user on the backend
export async function POST(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the newly added user
    const bodyData = await request.json();

    // Call the backend /sign-in-new-user route and send the new user in the request body
    const res = await fetch(`${apiBaseURL}/sign-in-new-user`, { method: "POST", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}