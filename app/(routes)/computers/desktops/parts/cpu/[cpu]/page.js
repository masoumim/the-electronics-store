// This file establishes the dynamic route /computers/desktops/parts/cpu/[cpu] which will display a single CPU product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function CpuPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="computersDesktopsPartsCpus" />
            <ProductPage id={params.cpu} />
        </div>
    );
}