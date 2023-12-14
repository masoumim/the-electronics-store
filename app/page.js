// page.js - This file is the main / root 'home page' for the app.

"use client"
import { useEffect, useState } from "react"
import { getProducts, getUser, logIn } from "./api/api"

export default function Home() {

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchData() {
      const fetchedProducts = await getProducts();      
      setProducts(fetchedProducts);

      // Try to login
      await logIn();

      // Try to set user state
      const user = await getUser();
      setUser(user);
    }
    fetchData();
  }, [])

  return (
    <>
      <p>Products:</p>
      {products.map((product, index) => {
        return <div key={index}>
          <span>{product.name}</span>
          <span> - {product.price}</span>
        </div>
      })}
      <p>User:</p>
      <p>{user.firstName}</p>
    </>
  )
}