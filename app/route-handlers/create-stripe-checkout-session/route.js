// This route handler creates a Stripe Checkout Session

import 'server-only'

// Route Handler for route: /route-handlers/create-stripe-checkout-session
// TODO: Iterate through the user's cart items and add them to the line_items array
export async function POST() {

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'cad',
                product_data: {
                    name: 'PlayStation 5',
                },
                unit_amount: 51999,
            },
            quantity: 1,
        }],
        mode: 'payment',
        ui_mode: 'embedded',
        return_url: 'http://localhost:3000'
    });

    return Response.json(session);
}