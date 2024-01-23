import 'server-only'

// Route Handler for route: /route-handlers/cart-remove-product
// Remove a Product from Cart
export async function GET(request) {    
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');
    const productID = searchParams.get('product_id');
        
    // Call the backend route '/cart/remove/:productId'
    console.log('calling the backend /cart/remove/:productId')
    const res = await fetch(`${apiBaseURL}/cart/remove/${productID}`, { method: "POST" });
    if (!res.ok) {
        throw res.Error;
    }

    const data = await res.json();
    return Response.json(data);
}