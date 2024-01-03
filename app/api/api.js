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

// Register a new user
export async function registerUser(firstName, lastName, email, password) {
    const data = { firstName, lastName, email, password }
    const res = await fetch(`route-handlers/register?api_base_url=${apiBaseUrl}`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
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
export async function checkBackendSignIn(){
    const res = await fetch(`route-handlers/check-backend-sign-in?api_base_url=${apiBaseUrl}`);
    if(!res.ok){
        throw res.Error;
    }
    return res.json();
}