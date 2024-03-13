// page.js - This file is the main / root 'home page' for the app.

import "server-only"
import AllProducts from "./components/all-products"
export default function Home() {


  return (
    <>
      <p>*Main page content goes here*</p>      
      <AllProducts />
    </>
  )
}