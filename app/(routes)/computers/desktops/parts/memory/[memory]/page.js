// This file establishes the dynamic route /computers/desktops/parts/memory/[memory] which will display a single Memory product.
import 'server-only';

import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function MemoryPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="computerDesktopPartsMem" />
            <ProductPage id={params.memory} />
        </div>
    );
}