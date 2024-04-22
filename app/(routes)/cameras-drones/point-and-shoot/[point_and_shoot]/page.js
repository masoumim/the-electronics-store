// This component establishes the dynamic route /cameras-drones/point-and-shoot/[point_and_shoot] which will display a single Point & Shoot camera product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function DslrPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="camerasPointAndShoot" />
            <ProductPage id={params.point_and_shoot} />
        </div>
    );
}