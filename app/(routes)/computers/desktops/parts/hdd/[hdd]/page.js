// This file establishes the dynamic route /computers/desktops/parts/hdd/[hdd] which will display a single Hard Disk Drive product.
import 'server-only';
import ProductPage from '@/app/components/product-page';

export default function HddPage({ params }) {
    return (
        <div>
            <ProductPage id={params.hdd} />
        </div>
    );
}
