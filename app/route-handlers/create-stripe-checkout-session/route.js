// This route handler creates a Stripe Checkout Session

import 'server-only'

// Route Handler for route: /route-handlers/create-stripe-checkout-session
export async function POST(request) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const bodyData = await request.json();
    const returnURL = process.env.NODE_ENV === "development" ? "http://localhost:3000/checkout-review" : "https://electronics-store-8382b35f5fca.herokuapp.com/checkout-review";

    // Create the Stripe Checkout Session    
    const session = await stripe.checkout.sessions.create({
        line_items: bodyData,
        mode: 'payment',
        ui_mode: 'embedded',
        return_url: returnURL
    });

    return Response.json(session);
}