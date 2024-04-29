// page.js - This file is the main / root 'home page' for the app.
'use client'
import { getProducts } from "../api/api";
import ProductCardFull from "./product-card-full";

const { useEffect, useState } = require("react");

export default function HomePage() {
    const [greatDeals, setGreatDeals] = useState([]);
    const [limitedSupply, setLimitedSupply] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();

            // Filter products for each section
            const greatDealsProducts = fetchedProducts.filter(product => product.discount_type !== 'none');
            const limitedSupplyProducts = fetchedProducts.filter(product => product.inventory <= 5);
            const mostPopularProducts = fetchedProducts.sort(() => 0.5 - Math.random()).slice(0, 10);

            setGreatDeals(greatDealsProducts);
            setLimitedSupply(limitedSupplyProducts);
            setMostPopular(mostPopularProducts);
        };

        fetchProducts();
    }, []);

    function determineURL(product) {
        let url = "";
        switch (product.category_code) {
            case "COMDES":
                url = `/computers/desktops/${product.id}`;
                break;
            case "COMLAP":
                url = `/computers/laptops/${product.id}`;
                break;
            case "COMDESPARMEM":
                url = `/computers/desktops/parts/memory/${product.id}`;
                break;
            case "COMDESPARHAR":
                url = `/computers/desktops/parts/hdd/${product.id}`;
                break;
            case "COMDESPARCPU":
                url = `/computers/desktops/parts/cpu/${product.id}`;
                break;
            case "GAMCONPLA":
                url = `/gaming/consoles/playstation/${product.id}`;
                break;
            case "GAMCONXBO":
                url = `/gaming/consoles/xbox/${product.id}`;
                break;
            case "GAMCONNIN":
                url = `/gaming/consoles/nintendo/${product.id}`;
                break;
            case "GAMEACCCON":
                url = `/gaming/accessories/consoles/${product.id}`;
                break;
            case "GAMEACCHEA":
                url = `/gaming/accessories/headsets/${product.id}`;
                break;
            case "HOMTEL":
                url = `/home-electronics/televisions/${product.id}`;
                break;
            case "HOMSPE":
                url = `/home-electronics/speakers/${product.id}`;
                break;
            case "HOMSEC":
                url = `/home-electronics/home-security/${product.id}`;
                break;
            case "HOMMED":
                url = `/home-electronics/media-streamers/${product.id}`;
                break;
            case "HOMAPP":
                url = `/home-electronics/appliances/${product.id}`;
                break;
            case "CAMDRO":
                url = `/cameras-drones/drones/${product.id}`;
                break;
            case "CAMMEM":
                url = `/cameras-drones/memory/${product.id}`;
                break;
            case "CAMACT":
                url = `/cameras-drones/action/${product.id}`;
                break;
            case "CAMDSL":
                url = `/cameras-drones/dslr/${product.id}`;
                break;
            case "CAMPOI":
                url = `/cameras-drones/point-and-shoot/${product.id}`;
                break;
            default:
                return `/`;
        }
        return url;
    }

    return (
        <div className="w-full">
            <h2>Great Deals</h2>
            <div className="flex flex-wrap gap-4">
                {greatDeals.map(product => (
                    <div key={product.id}>
                        <ProductCardFull
                            id={product.id}
                            image={product.img_url}
                            name={product.name}
                            price={product.price}
                            onSale={product.discount_type !== 'none'}
                            discountedPrice={product.price * (1 - product.discount_percent / 100)}
                            productCode={product.item_code}
                            inStock={product.inventory > 0}
                            url={determineURL(product)}
                        />
                    </div>
                ))}
            </div>

            {/* TODO: Finish these two sections */}
            {/* <h2>Limited Supply</h2>
            <div className="flex flex-wrap justify-start space-x-2 space-y-2">
                {limitedSupply.map(product => (
                    <ProductCardFull key={product.id} product={product} />
                ))}
            </div>

            <h2>Most Popular</h2>
            <div className="flex flex-wrap justify-start space-x-2 space-y-2">
                {mostPopular.map(product => (
                    <ProductCardFull key={product.id} product={product} />
                ))}
            </div> */}
        </div>
    );
}