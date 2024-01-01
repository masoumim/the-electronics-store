import 'server-only'

// Route Handler for route: /route-handlers/user-info
// Gets user info from the backend (first name, last name, email)
export async function GET(request) {    
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
        
    // Fetch the user from the backend
    const res = await fetch(`${apiBaseURL}/user`);
    if (!res.ok) {        
        console.log(`Error! route-handlers/user-info/route.js response object:`);
        console.log(res);
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();
    console.log(`fetched user info:`);
    console.log(data);
    return Response.json(data);
}