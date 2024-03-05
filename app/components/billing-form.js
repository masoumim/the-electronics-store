// billing-form.js - This interactive component contains a form used for creating and editing a billing address

'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getUserInfo, addBillingAddress, editBillingAddress, getBillingAddress, getPrimaryShippingAddress } from "../api/api.js";

const auth = getFirebaseAuth();

export default function BillingForm({ formType }) {
    const [inputFirstName, setInputFirstName] = useState("");             // Form 'First Name' input from user
    const [inputLastName, setInputLastName] = useState("");               // Form 'First Name' input from user
    const [inputStreetNumber, setInputStreetNumber] = useState("");
    const [inputStreetName, setInputStreetName] = useState("");
    const [inputUnit, setInputUnit] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [inputProvince, setInputProvince] = useState("");
    const [inputCountry, setInputCountry] = useState("");
    const [inputPostalCode, setInputPostalCode] = useState("");
    const [inputPhoneNumber, setInputPhoneNumber] = useState("");

    const [inputSameAsShippingCheckBox, setInputSameAsShippingCheckBox] = useState(false);
    const [disableFormInput, setDisableFormInput] = useState(false);
    const [primaryShippingAddress, setPrimaryShippingAddress] = useState({});

    const [user, setUser] = useState({}); // TODO: Delete this?
    const router = useRouter();

    // Get current signed-in user on page load
    useEffect(() => {
        async function fetchData() {
            console.log('address-form.js useEffect() called');

            // Get the current signed-in user
            // *currentUser will return the current user after sign-in
            const user = auth.currentUser;

            if (user) {
                console.log(`address-form.js called! auth.currentUser found = `);
                console.log(user);

                // Confirm user is signed in on the backend                
                console.log('checking if user is signed in on backend:');
                const backendUser = await checkBackendSignIn();
                console.log('backendUser = ');
                console.log(backendUser);
                if (backendUser) {
                    // Get user info from the backend
                    console.log(`calling getUserInfo()`)
                    const fetchedUserInfo = await getUserInfo();
                    console.log(`back from getUserInfo()`);

                    console.log(`fetchedUserInfo =`);
                    console.log(fetchedUserInfo);

                    // Set the User state variable
                    const returnedUser = {}
                    returnedUser.uid = user.uid;
                    returnedUser.email = user.email;
                    returnedUser.firstName = fetchedUserInfo.first_name;
                    returnedUser.lastName = fetchedUserInfo.last_name;

                    setUser(returnedUser);
                }
            } else {
                // Get the current signed-in user using onAuthStateChanged
                // *onAuthStateChanged will execute in this case when user closes / refreshes the 
                // browser window and they are still logged in on the frontend
                onAuthStateChanged(auth, async (user) => {
                    console.log('address-form.js - onAuthStateChange() called!')
                    if (user) {
                        console.log('signed-in user onAuthStateChange found!');

                        // Check that user is signed-in in the backend
                        console.log('onAuthStateChange() - calling checkBackendSignIn()')
                        const backendUser = await checkBackendSignIn();

                        // Set the User state variable                        
                        if (backendUser) {
                            // Get user info from the backend
                            console.log('onAuthStateChange() - backendUser found - calling getUserInfo()');
                            const fetchedUserInfo = await getUserInfo();
                            console.log('fetchedUserInfo = ');
                            console.log(fetchedUserInfo);

                            // Set the User state variable
                            const returnedUser = {}
                            returnedUser.uid = user.uid;
                            returnedUser.email = user.email;
                            returnedUser.firstName = fetchedUserInfo.first_name;
                            returnedUser.lastName = fetchedUserInfo.last_name;

                            setUser(returnedUser);
                        }
                    }
                    else {
                        // No signed-in user found
                        console.log(`No signed-in user found! Redirecting to home "/"`);
                        router.push('/');
                    }
                })
            }
        }
        fetchData();
    }, [])

    // Redirect the user depending on the formType
    // Sets the input values of the billing address form to current values if the user is editing their billing info
    useEffect(() => {
        async function fetchData() {
            console.log(`useEffect() 2 - formType = ${formType}`);

            // Get the user's billing address data
            const fetchedAddress = await getBillingAddress();

            if (formType === "edit") {
                console.log(`formType === edit`);

                if (fetchedAddress) {
                    // Set the form data using the address                
                    setInputFirstName(fetchedAddress.first_name);
                    setInputLastName(fetchedAddress.last_name);
                    // Extract the 'street number' and 'street name' from fetchedAddress.address string
                    const address = fetchedAddress.address;
                    const addressArray = address.split(" ");
                    const streetName = address.replace(addressArray[0], "").trim();
                    setInputStreetNumber(addressArray[0]);
                    setInputStreetName(streetName);
                    setInputUnit(fetchedAddress.unit);
                    setInputCity(fetchedAddress.city);
                    setInputProvince(fetchedAddress.province);
                    setInputCountry(fetchedAddress.country);
                    setInputPostalCode(fetchedAddress.postal_code);
                    setInputPhoneNumber(fetchedAddress.phone_number);
                } else {
                    router.push('/add-billing');
                }
            }
            else {
                // formType === "add"
                console.log(`formType === add`);

                // If user already has a billing address, redirect them to /edit-billing
                if (fetchedAddress) router.push('/edit-billing');
            }
        }
        fetchData();
    }, [])

    // Checks if user has a primary shipping address
    // If so, set the primaryShippingAddress state object
    useEffect(() => {
        async function fetchData() {
            // Get the user's shipping address
            const fetchedShippingAddress = await getPrimaryShippingAddress();

            if (fetchedShippingAddress) {
                const shippingAddress = {};
                shippingAddress.firstName = fetchedShippingAddress.first_name;
                shippingAddress.lastName = fetchedShippingAddress.last_name;
                shippingAddress.address = fetchedShippingAddress.address;
                shippingAddress.unit = fetchedShippingAddress.unit;
                shippingAddress.city = fetchedShippingAddress.city;
                shippingAddress.province = fetchedShippingAddress.province;
                shippingAddress.country = fetchedShippingAddress.country;
                shippingAddress.postalCode = fetchedShippingAddress.postal_code;
                shippingAddress.phoneNumber = fetchedShippingAddress.phone_number;
                setPrimaryShippingAddress(shippingAddress);
            }
        }
        fetchData();
    }, [])

    // Form Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        let billingAddress = {};

        // Determine if billing address should be the same as shipping address
        if (inputSameAsShippingCheckBox) {
            // If so, set the billing address using the shipping address info
            billingAddress.firstName = primaryShippingAddress.firstName;
            billingAddress.lastName = primaryShippingAddress.lastName;
            // Extract the 'street number' and 'street name' from primaryShippingAddress.address state object
            const address = primaryShippingAddress.address;
            const addressArray = address.split(" ");
            const streetName = address.replace(addressArray[0], "").trim();
            billingAddress.streetNumber = addressArray[0];
            billingAddress.streetName = streetName;
            billingAddress.city = primaryShippingAddress.city;
            billingAddress.province = primaryShippingAddress.province;
            billingAddress.country = primaryShippingAddress.country;
            billingAddress.postalCode = primaryShippingAddress.postalCode;
            billingAddress.phoneNumber = primaryShippingAddress.phoneNumber;
            billingAddress.unit = primaryShippingAddress.unit;
        } else {
            // If not, set the billing address info using the form inputs
            billingAddress.firstName = inputFirstName;
            billingAddress.lastName = inputLastName;
            billingAddress.streetNumber = inputStreetNumber;
            billingAddress.streetName = inputStreetName;
            billingAddress.city = inputCity;
            billingAddress.province = inputProvince;
            billingAddress.country = inputCountry;
            billingAddress.postalCode = inputPostalCode;
            billingAddress.phoneNumber = inputPhoneNumber;
            billingAddress.unit = inputUnit;
        }

        // Add to backend database
        if (formType === "add") await addBillingAddress(billingAddress);
        if (formType === "edit") await editBillingAddress(billingAddress);

        // Redirect user back to the /account page
        router.push('/account');
    }

    // Handle form input
    const handleInput = async (e) => {
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
            case "same-as-shipping-checkbox":
                // If box is checked: disable all input fields, set the state variable using setInputSameAsShippingCheckBox(fieldValue)
                // If box is unchecked: enable all input fields, set the state variable using setInputSameAsShippingCheckBox(false)
                if (e.target.checked) {
                    setDisableFormInput(true);
                    setInputSameAsShippingCheckBox(fieldValue);

                    // Set input values to empty string
                    setInputFirstName("");
                    setInputLastName("");
                    setInputStreetNumber("");
                    setInputStreetName("");
                    setInputUnit("");
                    setInputCity("");
                    setInputProvince("");
                    setInputCountry("");
                    setInputPostalCode("");
                    setInputPhoneNumber("");
                }
                else {
                    setDisableFormInput(false);
                    setInputSameAsShippingCheckBox(false);

                    // Get the billing address and set the input values
                    const fetchedAddress = await getBillingAddress();
                    if (fetchedAddress) {
                        setInputFirstName(fetchedAddress.first_name);
                        setInputLastName(fetchedAddress.last_name);
                        // Extract the 'street number' and 'street name' from fetchedAddress.address string
                        const address = fetchedAddress.address;
                        const addressArray = address.split(" ");
                        const streetName = address.replace(addressArray[0], "").trim();
                        setInputStreetNumber(addressArray[0]);
                        setInputStreetName(streetName);
                        setInputUnit(fetchedAddress.unit);
                        setInputCity(fetchedAddress.city);
                        setInputProvince(fetchedAddress.province);
                        setInputCountry(fetchedAddress.country);
                        setInputPostalCode(fetchedAddress.postal_code);
                        setInputPhoneNumber(fetchedAddress.phone_number);
                    }
                }
                break;
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                            *First Name
                        </label>
                        <input onChange={handleInput} disabled={disableFormInput} required minLength={1} maxLength={50} pattern="^[A-Za-z]{1,50}$" value={inputFirstName} name="first-name" id="first-name" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                        <p className="text-gray-600 text-xs italic">Letters only, 50 character max</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                            *Last Name
                        </label>
                        <input onChange={handleInput} disabled={disableFormInput} required minLength={1} maxLength={50} pattern="^[A-Za-z]{1,50}$" value={inputLastName} name="last-name" id="last-name" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <p className="text-gray-600 text-xs italic">Letters only, 50 character max</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street-number">
                            *Street Number
                        </label>
                        <input onChange={handleInput} disabled={disableFormInput} required min={1} value={inputStreetNumber} name="street-number" id="street-number" type="number" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street-name">
                            *Street Name
                        </label>
                        <input onChange={handleInput} disabled={disableFormInput} required minLength={1} value={inputStreetName} name="street-name" id="street-name" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="unit">
                            Unit (optional)
                        </label>
                        <input onChange={handleInput} disabled={disableFormInput} maxLength={10} value={inputUnit} name="unit" id="unit" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                            *City
                        </label>
                        <input onChange={handleInput} disabled={disableFormInput} required minLength={1} value={inputCity} name="city" id="city" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="province">
                            *Province
                        </label>
                        <select name="province" id="province" onChange={handleInput} disabled={disableFormInput} value={inputProvince}>
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
                        <input onChange={handleInput} disabled={disableFormInput} required minLength={1} value={inputCountry} name="country" id="country" type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="postal-code">
                            *Postal Code
                        </label>
                        <input onChange={handleInput} disabled={disableFormInput} required minLength={6} maxLength={6} value={inputPostalCode} name="postal-code" id="postal-code" type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone-number">
                            *Phone Number
                        </label>
                        <input onChange={handleInput} disabled={disableFormInput} required minLength={10} maxLength={10} value={inputPhoneNumber} name="phone-number" id="phone-number" type="text" placeholder="5552223456" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <p className="text-gray-600 text-xs italic">Numbers only, example: 5552223456</p>
                    </div>
                </div>
                {formType === "add" ?
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Billing Address
                    </button>
                    :
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Save changes
                    </button>
                }
                {primaryShippingAddress.address ?
                    <>
                        <label htmlFor="same-as-shipping-checkbox">Same as shipping address</label>
                        <input onChange={handleInput} type="checkbox" id="same-as-shipping-checkbox" name="same-as-shipping-checkbox" value="same" />
                    </>
                    :
                    <></>
                }
            </form>
        </>
    )
}