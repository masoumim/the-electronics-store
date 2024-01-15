import 'server-only'

// Route Handler for route: /route-handlers/user-delete
// Calls backend route with the uid of the user to be deleted in the backend
export async function DELETE(request) {
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
    const uid = searchParams.get('uid');

    console.log('/route-handlers/user-delete/route.js - uid =');
    console.log(uid);
    console.log(apiBaseURL);

    const res = await fetch(`${apiBaseURL}/user?uid=${uid}`, { method: "DELETE" })
    if (!res.ok) {
        throw res.Error;
    }
    const data = await res.json();
    return Response.json(data);
}