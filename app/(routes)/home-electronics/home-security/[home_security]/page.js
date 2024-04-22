// This component establishes the dynamic route /home-electronics/home-security/[home-security] which will display a single home security product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function HomeSecurityPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="homeElectronicsHomeSecurity" />
            <ProductPage id={params.home_security} />
        </div>
    );
}