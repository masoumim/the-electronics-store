// This file establishes the dynamic route /computers/desktops/parts/memory/[memory] which will display a single Memory product.
import 'server-only';

import ProductPage from '@/app/components/product-page';

export default function MemoryPage({ params }) {
    return (
        <div>
            <ProductPage id={params.memory} />
        </div>
    );
}