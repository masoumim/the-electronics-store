// page.js - This file is the main / root 'home page' for the app.

import CarouselComponent from "./components/carousel"

export default function Home() {

  return (
    <>
      <div className="container mx-auto">
        <CarouselComponent />
      </div>
    </>
  )
}