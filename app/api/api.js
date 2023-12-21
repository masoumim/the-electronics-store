// This file contains functions that get and post data to the Express.js backend API

// TODO: Replace the following methods with server-side calls to route handlers


// Set the base url of the API
const apiBaseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://the-electronics-store-api-962f1726488d.herokuapp.com";

// Get all products
export async function getProducts() {
    const res = await fetch(`${apiBaseUrl}/products`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

// Get user profile info
export async function getUserInfo() {
    const res = await fetch(`${apiBaseUrl}/users/37`, { credentials: "include" });
    if (!res.ok) {
        return res.json();
    }
    return res.json()
}

// Send user ID Token to backend
export async function sendIdToken(tokenId){
    const data = {
        "tokenId": tokenId        
    }    
    const res = await fetch(`${apiBaseUrl}/firebase-auth`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
    if (!res.ok) {                      
        throw res.Error;
    }        
    return res.json()
}