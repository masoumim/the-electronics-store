// This file establishes the dynamic route /computers/laptops/[laptop] which will display a single laptop product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function LaptopPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="computersLaptops" />
            <ProductPage id={params.laptop} />
        </div>
    );
}