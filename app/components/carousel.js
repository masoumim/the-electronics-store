// This component is a carousel that will be displayed on the home page.
// The carousel uses the Splide library to create a simple image carousel.(https://splidejs.com/integration/react-splide/)
'use client';

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function CarouselComponent() {
    return (
        // Note: The div container must be the same width as the images in order for the carousel to display correctly
        <div className="flex justify-center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Splide options={{
                type: 'loop',
                perPage: 1,
                focus: 'center',                
            }}>
                <SplideSlide>
                    <img src="https://picsum.photos/1200/600" alt="Slide 1" />
                </SplideSlide>
                <SplideSlide>
                    <img src="https://picsum.photos/1200/600" alt="Slide 2" />
                </SplideSlide>
                <SplideSlide>
                    <img src="https://picsum.photos/1200/600" alt="Slide 3" />
                </SplideSlide>
                {/* Add more SplideSlide components for additional slides */}
            </Splide>
        </div>
    );
}






