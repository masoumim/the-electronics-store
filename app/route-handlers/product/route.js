import 'server-only'

// Route Handler for route: /route-handlers/product
// Get a product by product ID
export async function GET(request) {    
    
    
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
    const productID = searchParams.get('product_id');

    console.log(`ProductID: ${productID}`);
    
    // Fetch the product from the backend
    const res = await fetch(`${apiBaseURL}/products/${productID}`);
    if (!res.ok) {        
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();    
    return Response.json(data);
}