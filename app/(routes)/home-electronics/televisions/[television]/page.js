// This component establishes the dynamic route /home-electronics/televisions/[television] which will display a single television product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function TelevisionPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="homeElectronicsTelevisions" />
            <ProductPage id={params.television} />
        </div>
    );
}