// This component establishes the dynamic route /gaming/consoles/xbox/[xbox] which will display a single Xbox console product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function XboxPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="gamingConsolesXbox" />
            <ProductPage id={params.xbox} />
        </div>
    );
}