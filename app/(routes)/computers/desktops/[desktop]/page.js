// This component establishes the dynamic route /computers/desktops/[desktop] which will display a single desktop product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function DesktopPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="computersDesktops" />
            <ProductPage id={params.desktop} />
        </div>
    );
}