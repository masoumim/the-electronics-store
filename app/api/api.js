// This file contains functions that send and request data from the Express.js backend API.
// To accomplish SSR, the functions make a fetch to methods in the /route-handlers folder.
// It is these route.js files within the /route-handlers folder that contain the Express.js API routes.
// This pattern can be found here (https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
// The pattern used is 3. Fetching Data on the Client with Route Handlers

// Set the base url of the API
const apiBaseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://the-electronics-store-api-962f1726488d.herokuapp.com";

// Get all products
export async function getProducts() {
    const res = await fetch(`/route-handlers/products?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get product by product ID
export async function getProduct(productID) {
    const res = await fetch(`/route-handlers/product?api_base_url=${apiBaseUrl}&product_id=${productID}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get Cart info
export async function getCartInfo() {
    const res = await fetch(`/route-handlers/cart-info?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        return res.json();
    }
    return res.json()
}

// Add Product to Cart
export async function addProductToCart(productID) {    
    const res = await fetch(`/route-handlers/cart-add-product?api_base_url=${apiBaseUrl}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: productID })
    });
    if (!res.ok) {
        const error = await res.text(); // read the response body as text
        throw new Error(error);
    }
    return res.json()
}

// Remove Product from Cart
export async function removeProductFromCart(productID) {
    const res = await fetch(`/route-handlers/cart-remove-product?api_base_url=${apiBaseUrl}&product_id=${productID}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Delete Product from Cart
export async function deleteProductFromCart(productID) {
    const res = await fetch(`/route-handlers/cart-delete-product?api_base_url=${apiBaseUrl}&product_id=${productID}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get user profile info
export async function getUserInfo() {
    const res = await fetch(`/route-handlers/user-info?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        return res.json();
    }
    return res.json()
}

// Send user ID Token to backend to authorize user on server
export async function sendIdToken(idToken) {
    const res = await fetch(`/route-handlers/backend-auth?api_base_url=${apiBaseUrl}&id_token=${idToken}`, { method: "POST", headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Register a new user in the backend
export async function registerUser(firstName, lastName, email, uid) {
    const data = { firstName, lastName, email, uid }
    const res = await fetch(`/route-handlers/register?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })

    const responseData = await res.json();

    // Check if the response is not ok
    if (!res.ok) {
        // Check if the error message is about an existing user
        if (responseData === "Registration failed. User with that email address already exists.") {
            // Handle this specific error message
            // You can replace this with any action you want to perform in this case
            console.error(responseData);
        }
        throw new Error(responseData);
    }
    return responseData;
}

// Sign-in newly registered user on the backend
export async function signInNewUserBackend(newUser) {
    const res = await fetch(`/route-handlers/sign-in-new-backend?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(newUser), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Delete a user in the backend
export async function deleteUserBackend(uid) {
    const res = await fetch(`/route-handlers/user-delete?api_base_url=${apiBaseUrl}&uid=${uid}`, { method: "DELETE" });
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Sign user out of the backend
export async function signOutBackend() {
    const res = await fetch(`/route-handlers/signout-backend?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Check if user is signed-in on the backend
export async function checkBackendSignIn() {
    const res = await fetch(`/route-handlers/check-backend-sign-in?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Add a Primary Address
export async function addPrimaryShippingAddress(address) {
    const res = await fetch(`/route-handlers/primary-shipping-address?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Edit a Primary Address
export async function editPrimaryShippingAddress(address) {
    const res = await fetch(`/route-handlers/primary-shipping-address?api_base_url=${apiBaseUrl}`, { method: "PUT", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get Primary Shipping Address
export async function getPrimaryShippingAddress() {
    const res = await fetch(`/route-handlers/primary-shipping-address?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Get Alternate Shipping Address
export async function getAlternateShippingAddress() {
    const res = await fetch(`/route-handlers/alternate-shipping-address?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        // throw res.error;
        return false;
    }
    return res.json();
}

// Add Alternate Shipping Address
export async function addAlternateShippingAddress(address) {
    const res = await fetch(`/route-handlers/alternate-shipping-address?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.error;
    }
    return res.json()
}

// Update Alternate Shipping Address
export async function updateAlternateShippingAddress(address) {
    const res = await fetch(`/route-handlers/alternate-shipping-address?api_base_url=${apiBaseUrl}`, { method: "PUT", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.error;
    }
    return res.json()
}

// Add a Billing Address
export async function addBillingAddress(address) {
    const res = await fetch(`/route-handlers/billing-address?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Edit a Billing Address
export async function editBillingAddress(address) {
    const res = await fetch(`/route-handlers/billing-address?api_base_url=${apiBaseUrl}`, { method: "PUT", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get Billing Address
export async function getBillingAddress() {
    const res = await fetch(`/route-handlers/billing-address?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Create Checkout Session
export async function createCheckoutSession() {
    const res = await fetch(`/route-handlers/checkout-session?api_base_url=${apiBaseUrl}`, { method: "POST" })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get Checkout Session
export async function getCheckoutSession() {
    const res = await fetch(`/route-handlers/checkout-session?api_base_url=${apiBaseUrl}`, { method: "GET" });
    if (!res.ok) {
        return false;
    }
    return res.json();
}

// Update Checkout Session Stage
export async function updateCheckoutSessionStage(stageName) {
    const res = await fetch(`/route-handlers/checkout-session?api_base_url=${apiBaseUrl}&stage=${stageName}`, { method: "PUT" });
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Add a Shipping Address to the Checkout Session
export async function addCheckoutShippingAddress(addressID) {
    const res = await fetch(`/route-handlers/checkout-session-shipping?api_base_url=${apiBaseUrl}&shipping_address=${addressID}`, { method: "POST", headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Update the Checkout Session's Shipping Address
export async function updateCheckoutShippingAddress(addressID) {
    const res = await fetch(`/route-handlers/checkout-session-shipping?api_base_url=${apiBaseUrl}`, { method: "PUT", body: JSON.stringify(addressID), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Add a Billing Address to the Checkout Session
export async function addCheckoutBillingAddress(addressID) {
    const res = await fetch(`/route-handlers/checkout-session-billing?api_base_url=${apiBaseUrl}&billing_address=${addressID}`, { method: "POST", headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Update the Checkout Session's Billing Address
export async function updateCheckoutBillingAddress(addressID) {
    const res = await fetch(`/route-handlers/checkout-session-billing?api_base_url=${apiBaseUrl}`, { method: "PUT", body: JSON.stringify(addressID), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Add Product to the Stripe product catalogue
export async function stripeAddProduct(productData) {
    const response = await fetch(`/route-handlers/stripe-add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Stripe Product Add Failed: ${errorData.message || response.statusText}`);
    }

    return response.json();
}

// Create Stripe Checkout Session
export async function createStripeCheckoutSession(myLineItems) {
    const response = await fetch(`/route-handlers/create-stripe-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myLineItems),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Stripe Create Checkout Session Failed: ${errorData.message || response.statusText}`);
    }

    return response.json(response);
}

// Create an Order
export let createOrder = (function () {
    let executed = false;
    return async function () {
        if (!executed) {
            executed = true;
            console.log('Starting createOrder');
            const response = await fetch(`/route-handlers/order?api_base_url=${apiBaseUrl}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error(`Error creating order: ${response.statusText}`);
            }

            console.log('Finished createOrder');

            // If the request was successful, you can return a success message or the status code
            return { message: 'Order created successfully', status: response.status };
        }
    }
})();

// Get Orders
export async function getOrders() {
    const res = await fetch(`/route-handlers/order-history?api_base_url=${apiBaseUrl}`, { method: "GET" });
    if (!res.ok) {
        throw new Error('Error fetching orders');
    }
    return res.json();
}

// Get Computer products
export async function getComputers() {
    const response = await fetch(`/route-handlers/computers?api_base_url=${apiBaseUrl}`, { method: "GET" });
    if (!response.ok) {
        throw new Error('Error fetching computers');
    }
    return response.json();
}

// Get Gaming products
export async function getGaming() {
    const response = await fetch(`/route-handlers/gaming?api_base_url=${apiBaseUrl}`, { method: "GET" });
    if (!response.ok) {
        throw new Error('Error fetching gaming products');
    }
    return response.json();
}

// Get Home Electronics products
export async function getHomeElectronics() {
    const response = await fetch(`/route-handlers/home-electronics?api_base_url=${apiBaseUrl}`, { method: "GET" });
    if (!response.ok) {
        throw new Error('Error fetching home electronics products');
    }
    return response.json();
}

// Get Cameras & Drones products
export async function getCamerasDrones() {
    const response = await fetch(`/route-handlers/cameras-drones?api_base_url=${apiBaseUrl}`, { method: "GET" });
    if (!response.ok) {
        throw new Error('Error fetching cameras and drones products');
    }
    return response.json();
}

// Get Products by Category Code
export async function getProductsByCategory(categoryCode) {
    const response = await fetch(`/route-handlers/get-products-by-category?api_base_url=${apiBaseUrl}&category=${categoryCode}`, { method: "GET" });    
    if (!response.ok) {
        throw new Error('Error fetching products by category');
    }
    return response.json();
}

// Get Products containing Category Code
export async function getProductsContainingCategory(categoryCode) {
    const response = await fetch(`/route-handlers/get-products-containing-category?api_base_url=${apiBaseUrl}&category=${categoryCode}`, { method: "GET" });
    if (!response.ok) {
        throw new Error('Error fetching products containing category');
    }
    return response.json();
}
// Get Address by ID
export async function getAddressById(userId, addressId) {
    const res = await fetch(`/route-handlers/shipping-address?api_base_url=${apiBaseUrl}&userId=${userId}&addressId=${addressId}`, { method: "GET" });
    if (!res.ok) {
        throw new Error('Failed to fetch address');
    }
    return res.json();
}