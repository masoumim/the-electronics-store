import 'server-only'

// Route Handler for route: /route-handlers/get-products-containing-category
// Get products containing category code
export async function GET(request) {            
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
    const categoryCode = searchParams.get('category');

    const res = await fetch(`${apiBaseURL}/products/category/contains/${categoryCode}`);
    if (!res.ok) {        
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();    
    return Response.json(data);
}