// This component establishes the dynamic route /gaming/consoles/nintendo/[nintendo] which will display a single Nintendo console product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function NintendoPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="gamingConsolesNintendo" />
            <ProductPage id={params.nintendo} />
        </div>
    );
}


