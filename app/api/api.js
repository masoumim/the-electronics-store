// This file contains functions that get and post data to the Express.js backend API

// Set the base url of the API
const apiBaseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://electronics-store-api-b4c3eebe7021.herokuapp.com";

// Get all products
export async function getProducts() {
    const res = await fetch(`${apiBaseUrl}/products`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

// Login
export async function logIn() {    
    const data = {
        "username": "masoumi.mark@gmail.com",
        "password": "Mark1234567!"
    }
    
    const res = await fetch(`${apiBaseUrl}/login`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" }, credentials: "include" })
    if (!res.ok) {              
        throw new Error('Login failed')
    }    
    return res.json()
}

// Get user
export async function getUser() {
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
        throw new Error(res);
    }        
    return res.json()
}