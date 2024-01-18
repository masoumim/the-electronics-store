// page.js - This file is the main / root 'home page' for the app.

import "server-only"

import Product from "./components/product";

export default function Home() {

  return (
    <>
    <p>*Main page content goes here*</p>
    {/* Add All Products component here */}
    <Product productID={7}/>
    </>
  )
}