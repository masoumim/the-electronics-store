// This file contains functions that send and request data from the Express.js backend API

// Set the base url of the API
const apiBaseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://the-electronics-store-api-962f1726488d.herokuapp.com";

// Get all products
export async function getProducts() {
    const res = await fetch(`route-handlers/products?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get product by product ID
export async function getProduct(productID) {
    const res = await fetch(`route-handlers/product?api_base_url=${apiBaseUrl}&product_id=${productID}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get Cart info
export async function getCartInfo() {
    const res = await fetch(`route-handlers/cart-info?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        return res.json();
    }
    return res.json()
}

// Add Product to Cart
export async function addProductToCart(productID) {
    const res = await fetch(`route-handlers/cart-add-product?api_base_url=${apiBaseUrl}&product_id=${productID}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Remove Product from Cart
export async function removeProductFromCart(productID) {
    const res = await fetch(`route-handlers/cart-remove-product?api_base_url=${apiBaseUrl}&product_id=${productID}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Delete Product from Cart
export async function deleteProductFromCart(productID) {
    const res = await fetch(`route-handlers/cart-delete-product?api_base_url=${apiBaseUrl}&product_id=${productID}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get user profile info
export async function getUserInfo() {
    const res = await fetch(`route-handlers/user-info?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        return res.json();
    }
    return res.json()
}

// Send user ID Token to backend to authorize user on server
export async function sendIdToken(idToken) {
    const res = await fetch(`route-handlers/backend-auth?api_base_url=${apiBaseUrl}&id_token=${idToken}`, { method: "POST", headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Register a new user in the backend
export async function registerUser(firstName, lastName, email, uid) {
    const data = { firstName, lastName, email, uid }
    const res = await fetch(`route-handlers/register?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Sign-in newly registered user on the backend
export async function signInNewUserBackend(newUser) {
    const res = await fetch(`route-handlers/sign-in-new-backend?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(newUser), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Delete a user in the backend
export async function deleteUserBackend(uid) {
    const res = await fetch(`route-handlers/user-delete?api_base_url=${apiBaseUrl}&uid=${uid}`, { method: "DELETE" });
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Sign user out of the backend
export async function signOutBackend() {
    const res = await fetch(`route-handlers/signout-backend?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Check if user is signed-in on the backend
export async function checkBackendSignIn() {
    const res = await fetch(`route-handlers/check-backend-sign-in?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Add a Primary Address
export async function addPrimaryShippingAddress(address) {
    console.log(`address = `);
    console.log(address);
    const res = await fetch(`route-handlers/primary-shipping-address?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Edit a Primary Address
export async function editPrimaryShippingAddress(address) {
    const res = await fetch(`route-handlers/primary-shipping-address?api_base_url=${apiBaseUrl}`, { method: "PUT", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get Primary Address
export async function getPrimaryShippingAddress() {
    const res = await fetch(`route-handlers/primary-shipping-address?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}

// Add a Billing Address
export async function addBillingAddress(address) {
    console.log(`address = `);
    console.log(address);
    const res = await fetch(`route-handlers/billing-address?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Edit a Billing Address
export async function editBillingAddress(address) {
    const res = await fetch(`route-handlers/billing-address?api_base_url=${apiBaseUrl}`, { method: "PUT", body: JSON.stringify(address), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {
        throw res.Error;
    }
    return res.json()
}

// Get Billing Address
export async function getBillingAddress() {
    const res = await fetch(`route-handlers/billing-address?api_base_url=${apiBaseUrl}`);
    if (!res.ok) {
        throw res.Error;
    }
    return res.json();
}