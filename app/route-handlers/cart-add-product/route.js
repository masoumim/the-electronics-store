import 'server-only'

// Route Handler for route: /route-handlers/cart-add-product
// Get a product by product ID and add it to the user's Cart
export async function POST(request) {    
    // Get the base URL (either localhost or Heroku)
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    // Get the product ID from the request body
    const bodyData = await request.json();
    const productID = bodyData.productId;
        
    // Call the backend route '/cart/add/:productId'
    const res = await fetch(`${apiBaseURL}/cart/add/${productID}`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" } 
    });
    if (!res.ok) {
        throw new Error('Failed to add product to cart');
    }

    // Return the response body as JSON
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });    
}

// // Route Handler for route: /route-handlers/cart-add-product
// // Get a product by product ID and add it to the user's Cart
// export async function GET(request) {    
//     // Get the base URL (either localhost or Heroku)
//     const { searchParams } = new URL(request.url);
//     const apiBaseURL = searchParams.get('api_base_url');
//     const productID = searchParams.get('product_id');
        
//     // Call the backend route '/cart/add/:productId'
//     const res = await fetch(`${apiBaseURL}/cart/add/${productID}`, { method: "POST" });
//     if (!res.ok) {
//         const error = await res.json(); // read the response body as JSON
//         if (Object.keys(error).length === 0) {
//             // If the error object is empty, throw a generic error message
//             throw new Error('An error occurred on the server');
//         } else {
//             // Otherwise, throw the error message from the server
//             throw new Error(JSON.stringify(error));
//         }
//     }
//     // Return the response body as JSON
//     const data = await res.json();
//     return new Response(JSON.stringify(data), { status: 200 });    
// }