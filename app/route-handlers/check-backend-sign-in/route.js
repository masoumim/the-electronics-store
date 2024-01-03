import 'server-only'

// Route Handler for route: /route-handlers/check-backend-sign-in
// Checks and returns if a user is signed in on the backend
export async function GET(request) {    
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
        
    // Call the backend route
    const res = await fetch(`${apiBaseURL}/check-backend-sign-in`);
    if (!res.ok) {        
        console.log(`There was an error trying to call /check-backend-sign-in`);
        
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();
    console.log(`route-handlers/check-backend-sign-in/route.js: fetched:`);
    console.log(data);
    return Response.json(data);
}