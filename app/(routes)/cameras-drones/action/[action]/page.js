// This component establishes the dynamic route /cameras-drones/action/[action] which will display a single action camera product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function ActionPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="camerasAction" />
            <ProductPage id={params.action} />
        </div>
    );
}