// page.js - This file is the main / root 'home page' for the app.

import CarouselComponent from "./components/carousel"
import HomePage from "./components/home"

export default function Home() {

  return (
    <>
      <div className="container mx-auto">
        <CarouselComponent />
        <HomePage />
      </div>
    </>
  )
}