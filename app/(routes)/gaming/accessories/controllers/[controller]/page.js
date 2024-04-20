// This component establishes the dynamic route /gaming/accessories/[controller] which will display a single gaming controller product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function ControllerPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="gamingAccessoriesControllers" />
            <ProductPage id={params.controller} />
        </div>
    );
}