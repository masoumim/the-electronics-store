// address-form.js - This interactive component contains a form used for creating and editing a primary shipping address

'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getUserInfo, addPrimaryShippingAddress, editPrimaryShippingAddress, getPrimaryShippingAddress } from "../api/api.js";

const auth = getFirebaseAuth();

export default function AddressForm({ formType }) {
    const [inputFirstName, setInputFirstName] = useState("");             // Form input: 'First Name'
    const [inputLastName, setInputLastName] = useState("");               // Form input: 'Last Name'
    const [inputStreetNumber, setInputStreetNumber] = useState("");       // Form input: 'Street Number'
    const [inputStreetName, setInputStreetName] = useState("");           // Form input: 'Street Name'
    const [inputUnit, setInputUnit] = useState("");                       // Form input: 'Street Unit'
    const [inputCity, setInputCity] = useState("");                       // Form input: 'City'
    const [inputProvince, setInputProvince] = useState("");            // Form input: 'Province'
    const [inputCountry, setInputCountry] = useState("");                 // Form input: 'Country'
    const [inputPostalCode, setInputPostalCode] = useState("");           // Form input: 'Postal Code'
    const [inputPhoneNumber, setInputPhoneNumber] = useState("");         // Form input: 'Phone Number'

    const [displayAddAddressButton, setDisplayAddAddressButton] = useState(false);                      // Bool to display the 'Add Address' Button
    const [displayDisabledAddAddressButton, setDisplayDisabledAddAddressButton] = useState(false);      // Bool to disable the 'Add Address' Button
    const [displaySaveAddressButton, setDisplaySaveAddressButton] = useState(false);                    // Bool to display the 'Save Address' Button
    const [displayDisabledSaveAddressButton, setDisplayDisabledSaveAddressButton] = useState(false);    // Bool to disable the 'Save Address' Button

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
    // Sets the input values of the address form to current values if the user is editing their shipping info
    useEffect(() => {
        async function fetchData() {
            console.log(`useEffect() 2 - formType = ${formType}`);

            // Get the user's address data
            const fetchedAddress = await getPrimaryShippingAddress();

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
                    router.push('/add-address');
                }
            }
            else {
                // formType === "add"
                console.log(`formType === add`);

                // If user already has an address, redirect them to /edit-address
                if (fetchedAddress) router.push('/edit-address');
            }
        }
        fetchData();
    }, [])

    // Checks if the address form is filled. If so, enable the buttons 'Add Shipping Address' or 'Save Changes' depending on the passed in prop 'formType' ('edit' or 'add')
    useEffect(() => {
        // Activate the 'Save Alternate Shipping Address' button if all fields are filled out        
        const formInputs = [
            inputFirstName,
            inputLastName,
            inputStreetNumber,
            inputStreetName,
            inputCity,
            inputProvince,
            inputCountry,
            inputPostalCode,
            inputPhoneNumber
        ]

        // Check each input to see if it has a value
        const formInputsCheck = formInputs.every((element) => {
            return element != "";
        })

        // Set which button to display
        if (formType === 'add') {
            if (formInputsCheck && inputProvince !== "default") {
                setDisplayAddAddressButton(true);
                setDisplayDisabledAddAddressButton(false);
            } else {
                setDisplayAddAddressButton(false);
                setDisplayDisabledAddAddressButton(true);
            }
        }
        else {
            // formType === 'edit'
            if (formInputsCheck && inputProvince !== "default") {
                setDisplaySaveAddressButton(true);
                setDisplayDisabledSaveAddressButton(false);
            } else {
                setDisplaySaveAddressButton(false);
                setDisplayDisabledSaveAddressButton(true);
            }
        }
    });

    // Form Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const address = {};
        address.firstName = inputFirstName;
        address.lastName = inputLastName;
        address.streetNumber = inputStreetNumber;
        address.streetName = inputStreetName;
        address.city = inputCity;
        address.province = inputProvince;
        address.country = inputCountry;
        address.postalCode = inputPostalCode;
        address.phoneNumber = inputPhoneNumber;
        address.unit = inputUnit;

        // Add to backend database
        if (formType === "add") await addPrimaryShippingAddress(address);
        if (formType === "edit") await editPrimaryShippingAddress(address);

        // Redirect user back to the /account page
        router.push('/account');
    }

    // Handle form input
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
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
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
                        <select name="province" id="province" required onChange={handleInput} value={inputProvince}>
                            <option value="default">Select a province</option>
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

                {/* BUTTONS */}
                {displayAddAddressButton ?
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Shipping Address
                    </button>
                    :
                    <></>
                }
                {displayDisabledAddAddressButton ?
                    <button type="submit" disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Shipping Address
                    </button>
                    :
                    <></>
                }
                {displaySaveAddressButton ?
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Save Address
                    </button>
                    :
                    <></>
                }
                {displayDisabledSaveAddressButton ?
                    <button type="submit" disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Save Address
                    </button>
                    :
                    <></>
                }
            </form>
        </>
    )
}