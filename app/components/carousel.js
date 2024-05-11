// This component is a carousel that will be displayed on the home page.
// The carousel uses the Splide library to create a simple image carousel.(https://splidejs.com/integration/react-splide/)
'use client';

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function CarouselComponent() {
  return (
    <div className="flex justify-center sm:px-6 md:px-11 lg:px-16 xl:px-0">
      <Splide options={{
        type: 'loop',
        perPage: 1,
        focus: 'center',
      }}>
        <SplideSlide>
          <img src="https://storage.googleapis.com/the-electronics-store-bucket/carousel%20images/carousel_1.png" alt="An add for AMD Ryzen products" />
        </SplideSlide>
        <SplideSlide>
          <img src="https://storage.googleapis.com/the-electronics-store-bucket/carousel%20images/carousel_2.png" alt="An add announcing the PS5 is in stock" />
        </SplideSlide>
        <SplideSlide>
          <img src="https://storage.googleapis.com/the-electronics-store-bucket/carousel%20images/carousel_3.png" alt="An add depicting the GoPro Hero 11" />
        </SplideSlide>
      </Splide>
    </div>
  );
}