// checkout-shipping.js - This component handles the Shipping step (1 of 4) of the checkout process.

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getPrimaryShippingAddress, getAlternateShippingAddress, createCheckoutSession } from "../api/api.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";

const auth = getFirebaseAuth();

export default function CheckoutShipping() {
    const contactsCtx = useContext(ctx);                                                        // The Context object
    const cart = contactsCtx[0];                                                                // State object representing user's cart
    const setCart = contactsCtx[1];                                                             // Setter to set cart
    const cartProducts = contactsCtx[2];                                                        // State object representing user's cart
    const setCartProducts = contactsCtx[3];                                                     // Setter to set cart
    const [cartProductsInfo, setCartProductsInfo] = useState([]);                               // Array of cart product(s) info (name, price, description etc)  
    const [hasPrimaryShippingAddress, setHasPrimaryShippingAddress] = useState(false);          // Used for conditionally rendering the 'proceed to payment' button
    const [hasAlternateShippingAddress, setHasAlternateShippingAddress] = useState(false);      // Used for conditionally rendering the 'save alternate address' button
    const [primaryAddressSelected, setPrimaryAddressSelected] = useState(false);                // Used to set the 'Use primary address' radio button
    const [alternateAddressSelected, setAlternateAddressSelected] = useState(false);            // Used to set the 'Use alternate address' radio button
    const [alternateAddressFormFilled, setAlternateAddressFormFilled] = useState(false);        // Used to conditionally render the 'Save Alternate Address' button
    const [hasCheckoutSession, setHasCheckoutSession] = useState(false);                        // Used to prevent fetching user's Alternate Shipping Address before a Checkout Session has been created

    // Form input
    const [inputFirstName, setInputFirstName] = useState("");                           // Form input: 'First Name'
    const [inputLastName, setInputLastName] = useState("");                             // Form input: 'Last Name'
    const [inputStreetNumber, setInputStreetNumber] = useState("");                     // Form input: 'Street Number'
    const [inputStreetName, setInputStreetName] = useState("");                         // Form input: 'Street Name'
    const [inputUnit, setInputUnit] = useState("");                                     // Form input: 'Street Unit'
    const [inputCity, setInputCity] = useState("");                                     // Form input: 'City'
    const [inputProvince, setInputProvince] = useState("");                             // Form input: 'Province'
    const [inputCountry, setInputCountry] = useState("");                               // Form input: 'Country'
    const [inputPostalCode, setInputPostalCode] = useState("");                         // Form input: 'Postal Code'
    const [inputPhoneNumber, setInputPhoneNumber] = useState("");                       // Form input: 'Phone Number'
    const [primaryShippingAddress, setPrimaryShippingAddress] = useState({});           // The user's primary shipping address

    const router = useRouter();



    // If a user is signed-in, get cart info. Otherwise, redirect user to /sign-in page
    useEffect(() => {
        async function fetchData() {
            // Get the current signed-in user            
            const user = auth.currentUser;
            if (user) {
                // Confirm user is signed in on the backend                                
                const backendUser = await checkBackendSignIn();
                if (backendUser) {
                    // Get Cart info
                    const cartInfo = await getCartInfo();
                    setCart(cartInfo);
                    setCartProducts(cartInfo.cart_product);
                }
            } else {
                // Get the current signed-in user using onAuthStateChanged                
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        // Check that user is signed-in in the backend                        
                        const backendUser = await checkBackendSignIn();
                        if (backendUser) {
                            // Get Cart info
                            const cartInfo = await getCartInfo();
                            setCart(cartInfo);
                            setCartProducts(cartInfo.cart_product);
                        }
                    }
                    else {
                        // Redirect user to /sign-in page
                        router.push('/sign-in')
                    }
                })
            }
        }
        fetchData();
    }, [])

    // 1. Redirects user to home if they don't have any items in cart
    useEffect(() => {
        async function fetchData() {
            // Fetch cart                      
            const fetchedCart = await getCartInfo();
            if (fetchedCart.num_items === 0) router.push('/');
        }
        fetchData();
    }, [])

    // 2. Create Checkout Session if user doesn't have one.
    useEffect(() => {
        async function fetchData() {
            // Check if user has Checkout Session
            // If not, create one!
            const foundCheckoutSession = await getCheckoutSession();
            if (!foundCheckoutSession){
                await createCheckoutSession();
                setHasCheckoutSession(true);
            }            
        }
        fetchData();
    }, [])


    // TEST: COMBINE STEP 2 (FETCH PRIMARY SHIPPING ADDRESS) AND STEP 3 (FETCH ALTERNATE SHIPPING ADDRESS) IN ONE useEffect()
    // EXAMPLE 1:
    // useEffect(() => {
    //     const fetchContent = async () => {
    //         try {
    //             //...
    //             return responseData.content;
    //         } catch (err) { }
    //     };

    //     const fetchSectors = async (firstId) => {
    //         try {
    //             //...
    //             return responseData.sectors;
    //         } catch (err) { }
    //     };

    //     const fetchBoth = async () => {
    //         const tempLoadedContent = await fetchContent();
    //         const tempLoadedSectors = await fetchSectors(tempLoadedContent[0].id);
    //         setLoadedContent(tempLoadedContent);
    //         setLoadedSectors(tempLoadedSectors);
    //     };

    //     fetchBoth();
    // }, []);

    // EXAMPLE 2:
    // useEffect(() => {
    //     const fetchStudents = async () => {
    //         const students = await studentService.getAll()
    //         setStudents(students)
    //     }

    //     const fetchCourses = async () => {
    //         const courses = await courseService.getAll()
    //         setCourses(courses)
    //     }

    //     const fetchSchedules = async () => {
    //         const schedules = await scheduleService.getAll()
    //         setSchedules(schedules)
    //     }


    //     fetchStudents()
    //     fetchCourses()
    //     fetchSchedules()
    // }, [])



    // Trying step 2 + 3 (doing all fetching inside one useEffect()) using EXAMPLE 1 above:
    useEffect(() => {
        // Fetch Primary Shipping Address
        async function fetchPrimaryShippingAddress() {
            const fetchedAddress = await getPrimaryShippingAddress();

            if (fetchedAddress) {
                const addressObj = {};
                addressObj.address = fetchedAddress.address;
                addressObj.unit = fetchedAddress.unit;
                addressObj.city = fetchedAddress.city;
                addressObj.province = fetchedAddress.province;
                addressObj.country = fetchedAddress.country;
                addressObj.postalCode = fetchedAddress.postal_code;
                addressObj.phoneNumber = fetchedAddress.phone_number;
                setPrimaryShippingAddress(addressObj); // The user's primary shipping address
                setHasPrimaryShippingAddress(true); // Used for conditionally rendering the 'proceed to payment' button

                // Set the 'Use Primary Shipping Address' Radio button to be selected
                setPrimaryAddressSelected(true);
            } else {
                setHasPrimaryShippingAddress(false);
            }
            return fetchedAddress;
        }

        // Fetch Alternate Shipping Address
        async function fetchAlternateShippingAddress() {
            // Fetch Alternate Shipping Address
            const fetchedAddress = await getAlternateShippingAddress(); // <-- this has no problems calling an empty getAlternateShippingAddress() and getting inside the func...

            if (fetchedAddress) {
                setHasAlternateShippingAddress(true); // Used for conditionally rendering the 'Save Changes to Alternate Shipping Address' button
            } else {
                setHasAlternateShippingAddress(false); // Used for conditionally rendering the 'Save Changes to Alternate Shipping Address' button
            }
            return fetchedAddress;
        }

        // Fetch Both
        async function fetchBoth() {
            const fetchedPrimaryShippingAddress = await fetchPrimaryShippingAddress();
            if (hasCheckoutSession) {
                const fetchedAlternateShippingAddress = await fetchAlternateShippingAddress();
            }
            console.log(fetchedPrimaryShippingAddress);            
        }
        fetchBoth();
    }, [hasCheckoutSession]);


    // // 2. Check if the the user has a Primary Shipping Address 
    // useEffect(() => {
    //     async function fetchData() {
    //         // Fetch address                      
    //         const fetchedAddress = await getPrimaryShippingAddress();

    //         if (fetchedAddress) {
    //             const addressObj = {};
    //             addressObj.address = fetchedAddress.address;
    //             addressObj.unit = fetchedAddress.unit;
    //             addressObj.city = fetchedAddress.city;
    //             addressObj.province = fetchedAddress.province;
    //             addressObj.country = fetchedAddress.country;
    //             addressObj.postalCode = fetchedAddress.postal_code;
    //             addressObj.phoneNumber = fetchedAddress.phone_number;
    //             setPrimaryShippingAddress(addressObj); // The user's primary shipping address
    //             setHasPrimaryShippingAddress(true); // Used for conditionally rendering the 'proceed to payment' button

    //             // Set the 'Use Primary Shipping Address' Radio button to be selected
    //             setPrimaryAddressSelected(true);
    //         } else {
    //             setHasPrimaryShippingAddress(false);
    //         }
    //     }
    //     fetchData();
    // }, [])

    // // 3. Check if the user has an Alternate Shipping Address    
    // useEffect(() => {
    //     async function fetchData() {
    //         // Fetch address                      
    //         const fetchedAddress = await getAlternateShippingAddress(); // <-- this has no problems calling an empty getAlternateShippingAddress() and getting inside the func...

    //         if (fetchedAddress) {
    //             setHasAlternateShippingAddress(true); // Used for conditionally rendering the 'Save Changes to Alternate Shipping Address' button
    //         } else {
    //             setHasAlternateShippingAddress(false); // Used for conditionally rendering the 'Save Changes to Alternate Shipping Address' button
    //         }
    //     }
    //     fetchData();
    // }, [])


    // // 4. TODO: Create useEffect that populates the alternate address form with the user's alternate shipping address and then calls setAlternateAddressFormFilled(true)
    // useEffect(() => {
    //     async function fetchData() {
    //         // Fetch address                      
    //         const fetchedAddress = await getAlternateShippingAddress();

    //         if (fetchedAddress) {
    //             const addressObj = {};
    //             addressObj.address = fetchedAddress.address;
    //             addressObj.unit = fetchedAddress.unit;
    //             addressObj.city = fetchedAddress.city;
    //             addressObj.province = fetchedAddress.province;
    //             addressObj.country = fetchedAddress.country;
    //             addressObj.postalCode = fetchedAddress.postal_code;
    //             addressObj.phoneNumber = fetchedAddress.phone_number;
    //             setAlternateAddressFormFilled(addressObj);
    //             setHasAlternateShippingAddress(true); // Used for conditionally rendering the 'save alternate address' button
    //         } else {
    //             setHasAlternateShippingAddress(false); // Used for conditionally rendering the 'save alternate address' button
    //         }
    //     }
    //     fetchData();
    // }, [])


    // // Check if the Alternate Address Form is filled. 
    // // If so, set the boolean which which will render the 
    // useEffect(() => {

    //     // Activate the 'Save Alternate Shipping Address' button if all fields are filled out        
    //     const formInputs = [
    //         inputFirstName,
    //         inputLastName,
    //         inputStreetNumber,
    //         inputStreetName,
    //         inputCity,
    //         inputProvince,
    //         inputCountry,
    //         inputPostalCode,
    //         inputPhoneNumber
    //     ]

    //     // Check each input value to check that it has a value
    //     const formInputsCheck = formInputs.every((element) => {
    //         return element != "";
    //     })

    //     // If every form field has a value, activate the button
    //     if (formInputsCheck) {
    //         setHasAlternateShippingAddress(true); // Used for conditionally rendering the 'save alternate address' button
    //     }
    //     else {
    //         setHasAlternateShippingAddress(false); // Used for conditionally rendering the 'save alternate address' button
    //     }
    // });



    // TODO: Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;

        // TODO: Handle form submission
    }


    // TODO: Handle form input
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        switch (fieldName) {
            case "first-name":
                setInputFirstName(fieldValue);
                break;
            case "last-name":
                setInputLastName(fieldValue);
                break;
            case "street-number":
                setInputStreetNumber(fieldValue);
                break;
            case "street-name":
                setInputStreetName(fieldValue);
                break;
            case "city":
                setInputCity(fieldValue);
                break;
            case "province":
                setInputProvince(fieldValue);
                break;
            case "country":
                setInputCountry(fieldValue);
                break;
            case "postal-code":
                setInputPostalCode(fieldValue);
                break;
            case "phone-number":
                setInputPhoneNumber(fieldValue);
                break;
            case "unit":
                setInputUnit(fieldValue);
                break;
        }
    }

    return (
        <>
            {/* Render two radio buttons. 
            Radio 1 is for choosing the user's Primary Shipping Address. 
            Radio 2 is for choosing an Alternate Shipping Address - selecting it renders a form for entering an alternative shipping address*/}
            <label htmlFor="address-primary" className="text-red-600">Use primary address</label>
            <input onChange={handleInput} type="radio" checked={primaryAddressSelected} id="address-primary" name="address-primary" />
            <br />
            <label htmlFor="address-alternate" className="text-red-600">Use alternate address</label>
            <input onChange={handleInput} type="radio" checked={alternateAddressSelected} id="address-alternate" name="address-alternate" />
            <br />
            <b>Shipping Info</b>
            <br />
            <br />
            <b>Primary Shipping Address:</b>
            {/* If the user has a primary shipping address, conditionally render the shipping address details*/}
            {hasPrimaryShippingAddress ?
                <>
                    <p>Address: {primaryShippingAddress.address}</p>
                    <p>Unit: {primaryShippingAddress.unit}</p>
                    <p>City: {primaryShippingAddress.city}</p>
                    <p>Province: {primaryShippingAddress.province}</p>
                    <p>Country: {primaryShippingAddress.country}</p>
                    <p>Postal Code: {primaryShippingAddress.postalCode}</p>
                    <p>Phone Number: {primaryShippingAddress.phoneNumber}</p>
                    <Link href={"/edit-address"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit Primary Shipping Address</Link>
                </>
                :
                <Link href={"/add-address"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Primary Shipping Address</Link>
            }
            <br />
            <br />
            <b>Alternate Shipping Address:</b>
            {/* Alternate Address Form */}
            <br />
            <br />
            <form onSubmit={handleSubmit} id="alternate-address-form" className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                            *First Name
                        </label>
                        <input onChange={handleInput} required minLength={1} maxLength={50} pattern="^[A-Za-z]{1,50}$" value={inputFirstName} name="first-name" id="first-name" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                        <p className="text-gray-600 text-xs italic">Letters only, 50 character max</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                            *Last Name
                        </label>
                        <input onChange={handleInput} required minLength={1} maxLength={50} pattern="^[A-Za-z]{1,50}$" value={inputLastName} name="last-name" id="last-name" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <p className="text-gray-600 text-xs italic">Letters only, 50 character max</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street-number">
                            *Street Number
                        </label>
                        <input onChange={handleInput} required min={1} value={inputStreetNumber} name="street-number" id="street-number" type="number" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street-name">
                            *Street Name
                        </label>
                        <input onChange={handleInput} required minLength={1} value={inputStreetName} name="street-name" id="street-name" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="unit">
                            Unit (optional)
                        </label>
                        <input onChange={handleInput} maxLength={10} value={inputUnit} name="unit" id="unit" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                            *City
                        </label>
                        <input onChange={handleInput} required minLength={1} value={inputCity} name="city" id="city" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="province">
                            *Province
                        </label>
                        <select name="province" id="province" onChange={handleInput} value={inputProvince}>
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="MB">Manitoba</option>
                            <option value="NB">New Brunswick</option>
                            <option value="NL">Newfoundland and Labrador</option>
                            <option value="NS">Nova Scotia</option>
                            <option value="ON">Ontario</option>
                            <option value="PE">Prince Edward Island</option>
                            <option value="QC">Quebec</option>
                            <option value="SK">Saskatchewan</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="country">
                            *Country
                        </label>
                        <input onChange={handleInput} required minLength={1} value={inputCountry} name="country" id="country" type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="postal-code">
                            *Postal Code
                        </label>
                        <input onChange={handleInput} required minLength={6} maxLength={6} value={inputPostalCode} name="postal-code" id="postal-code" type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone-number">
                            *Phone Number
                        </label>
                        <input onChange={handleInput} required minLength={10} maxLength={10} value={inputPhoneNumber} name="phone-number" id="phone-number" type="text" placeholder="5552223456" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <p className="text-gray-600 text-xs italic">Numbers only, example: 5552223456</p>
                    </div>
                </div>
            </form>





            {hasAlternateShippingAddress ?
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Alternate Shipping Address</button>
                :
                <button disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Alternate Shipping Address</button>
            }
            <br />
            <br />
            {/* TODO: This needs to be fixed. For the 'proceed to payment' button to be active, we should check if the user has a primary shipping address OR an alternate shipping address*/}
            {hasPrimaryShippingAddress || hasAlternateShippingAddress ?
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
                :
                <button disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
            }
        </>
    )

}