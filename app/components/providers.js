/*
Providers.js - This file sets up the React 'Context' feature which enables sharing state data 
between components without having to pass them down manually as props.

The Context feature is used here for:
- Setting the Number of item, subtotal, taxes and total of the cart.js component from a cart-product.js component.
From within a cart, user can increase / decrease the quantity of a product which changes values of the cart itself (num of items, subtotal etc)
Using the shared state of Context variables, we can update them in cart-component.js which will cause cart.js to re-render, displaying the new values

The Providers component below accepts a 'children' prop from the RootLayout component located in app/layout.js
This children prop represents every component in the component tree, hence the ability to share a state variable in a global way.
*/

"use client"

import { createContext, useState } from 'react';

// Create the context
export const ctx = createContext();

// Create and export the 'Providers' component
export default function Providers({ children }) {

    // Create the shared state objects    
    const [cart, setCart] = useState({});
    const [cartProducts, setCartProducts] = useState(null);

    return (
        <ctx.Provider value={[cart, setCart, cartProducts, setCartProducts]}>
            {children}
        </ctx.Provider>
    );
}
