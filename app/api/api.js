// This file contains functions that get and post data to the Express.js backend API

// TODO: Replace the following methods with server-side calls to route handlers


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

// Get user profile info
// export async function getUserInfo() {
//     const res = await fetch(`${apiBaseUrl}/users/37`, { credentials: "include" });
//     if (!res.ok) {
//         return res.json();
//     }
//     return res.json()
// }

// Send user ID Token to backend to authorize user on server
export async function sendIdToken(idToken){   
    const res = await fetch(`route-handlers/backend-auth?api_base_url=${apiBaseUrl}&id_token=${idToken}`, { method: "POST", headers: { "Content-Type": "application/json" } })
    if (!res.ok) {                      
        throw res.Error;
    }                
    return res.json()
}