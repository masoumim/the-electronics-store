// This component establishes the dynamic route /cameras-drones/dslr/[dslr] which will display a single DSLR camera product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function DslrPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="camerasDslr" />
            <ProductPage id={params.dslr} />
        </div>
    );
}