import { createContext, useState, useEffect } from 'react';

const StripeContext = createContext(null);

export const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    // Replace with your publishable key
    const initStripe = async () => {
      const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      const stripeObj = await stripePromise;
      setStripe(stripeObj);
    };

    initStripe();
  }, []);

  return (
    <StripeContext.Provider value={stripe}>{children}</StripeContext.Provider>
  );
};

export default StripeContext;
