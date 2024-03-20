import 'server-only'

// Route Handler for route: /route-handlers/cart-info
// Gets Cart info from the backend
export async function GET(request) {        
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
        
    // Fetch the Cart info from the backend
    const res = await fetch(`${apiBaseURL}/cart`);
    if (!res.ok) {                        
        throw new Error('Failed to fetch cart info data')
    }
    const data = await res.json();
    console.log('fetched cart data = ');
    console.log(data);   
    return Response.json(data);
}