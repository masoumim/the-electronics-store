// This component establishes the dynamic route /home-electronics/appliances/[appliance] which will display a single appliance product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function AppliancePage({ params }) {
    return (
        <div>
            <Breadcrumbs category="homeElectronicsAppliances" />
            <ProductPage id={params.appliance} />
        </div>
    );
}
