import 'server-only'

// Route Handler for route: /route-handlers/add-primary-shipping-address
// Add primary shipping address
export async function POST(request) {
    console.log("POST /route-handlers/add-primary-shipping-address");
    
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the address info from the request body
    const bodyData = await request.json();

    // Call the backend /account/primary-address route and send the address info to the route
    const res = await fetch(`${apiBaseURL}/account/primary-address`, { method: "POST", body: JSON.stringify(bodyData), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}