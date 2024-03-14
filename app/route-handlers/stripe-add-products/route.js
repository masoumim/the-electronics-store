// This route handler is testing the Stripe API's 'Create a Product' route

import 'server-only'

import { useStripe } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { ctx } from "@/app/components/providers.js"

// Route Handler for route: /route-handlers/stripe-add-products
export async function POST(request) {
    // Get the base URL
    // const { searchParams } = new URL(request.url);
    // const apiBaseURL = searchParams.get('api_base_url');

    // Fetch the products from the backend
    // const res = await fetch(`${apiBaseURL}/products`);
    // if (!res.ok) {        
    //     throw new Error('Failed to fetch data')
    // }
    // const data = await res.json();    
    // return Response.json(data);




    console.log(`INSIDE STRIPE-ADD-PRODUCTS ROUTE.JS!`);

    stripe = useStripe();

    console.log(`STRIPE OBJECT:`);
    console.log(stripe);

    console.log(`MY PRIVATE KEY:`);
    console.log(process.env.STRIPE_SECRET_KEY);

    const product = await stripe.products.create({
        name: 'Basic Dashboard',
        default_price_data: {
            unit_amount: 1000,
            currency: 'usd',
            recurring: {
                interval: 'month',
            },
        },
        expand: ['default_price'],
    });
}