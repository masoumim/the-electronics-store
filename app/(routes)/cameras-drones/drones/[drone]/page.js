// This component establishes the dynamic route /cameras-drones/drones/[drone] which will display a single drone product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function DronePage({ params }) {
    return (
        <div>
            <Breadcrumbs category="drones" />
            <ProductPage id={params.drone} />
        </div>
    );
}