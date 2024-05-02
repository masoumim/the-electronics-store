// checkout-steps.js - This component uses the DaisyUI 'Steps' UI component (https://daisyui.com/components/steps) to display the steps of the checkout process.
'use client'

export default function CheckoutSteps({ currentStep }) {
    return (
        <ul className="steps steps-vertical lg:steps-horizontal p-4">
            <li className={`step ${currentStep === 1 ? 'step-primary' : ''} text-blue-500`}>Shipping</li>
            <li className={`step ${currentStep === 2 ? 'step-primary' : ''} text-blue-500`}>Billing</li>
            <li className={`step ${currentStep === 3 ? 'step-primary' : ''} text-blue-500`}>Payment</li>
            <li className={`step ${currentStep === 4 ? 'step-primary' : ''} text-blue-500`}>Review</li>
        </ul>
    )
}