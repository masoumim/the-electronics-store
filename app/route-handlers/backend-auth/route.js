import 'server-only'

// Route Handler for route: /route-handlers/backend-auth
// Send signed in user's token ID to the backend to authorize user on server
export async function POST(request) {
  // Get the base URL (either localhost or Heroku)
  const { searchParams } = new URL(request.url);
  const apiBaseURL = searchParams.get('api_base_url');
  const idToken = searchParams.get('id_token');

  // Send the id token to the backend to authenticate user on the server
  const bodyData = {
    "idToken": idToken
  }
  const res = await fetch(`${apiBaseURL}/firebase-auth`, { method: "POST", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
  if (!res.ok) {
    throw res.Error;
  }
  const data = await res.json();
  console.log(data); 
  return Response.json(data);
}