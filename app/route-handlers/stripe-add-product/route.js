// This route handler is testing the Stripe API's 'Create a Product' route

import 'server-only'

// Route Handler for route: /route-handlers/stripe-add-product
export async function POST(request) {    
    
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const product = await stripe.products.create({
        name: 'Test Product',
        default_price_data: {
            unit_amount: 99,
            currency: 'cad',
            recurring: {
                interval: 'month',
            },
        },
        expand: ['default_price'],
    });

    return Response.json(product);
}