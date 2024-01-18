import 'server-only'

// Route Handler for route: /route-handlers/cart-add-product
// Get a product by product ID and add it to the user's Cart
export async function GET(request) {    
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
    const productID = searchParams.get('product_id');
        
    // Call the backend route '/cart/add/:productId'
    const res = await fetch(`${apiBaseURL}/cart/add/${productID}`, { method: "POST" });
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);    
}