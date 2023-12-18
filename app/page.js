// page.js - This file is the main / root 'home page' for the app.

import "server-only"
// import { useEffect, useState } from "react"
// import { getProducts } from "./api/api"
// import { registerUser, signInUser, signOutUser } from "./firebase/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

import AuthTest from "./components/auth-test"

export default function Home() {
  // const [products, setProducts] = useState([]);
  // const [user, setUser] = useState("");

  // Test fetching of /products from API
  // useEffect(() => {
  //   async function fetchData() {
  //     const fetchedProducts = await getProducts();
  //     setProducts(fetchedProducts);
  //   }
  //   fetchData();
  // }, [])

  // Test getting the current logged in user
  // *onAuthStateChanged is the recommended way to get the logged in user by Firebase
  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {        
  //       setUser(user.email);
  //     }
  //     else{
  //       setUser("");
  //     }
  //   });
  // }, [user])

  // return (
  //   <>
  //     <p>Products:</p>
  //     {products.map((product, index) => {
  //       return <div key={index}>
  //         <span>{product.name}</span>
  //         <span> - {product.price}</span>
  //       </div>
  //     })}
  //     <button onClick={() => register("foo@bar.com", "Foo1234567!")}>Register</button>
  //     <p />
  //     <button onClick={() => signInUser("foo@bar.com", "Foo1234567!")}>Sign In</button>
  //     <p />
  //     <button onClick={signOutUser}>Sign Out</button>
  //     <p />
  //     <p>Signed in user: {user}</p>
  //   </>
  // )

  return (
    <>
    <p>Main page</p>
    <AuthTest/>
    </>
  )
}