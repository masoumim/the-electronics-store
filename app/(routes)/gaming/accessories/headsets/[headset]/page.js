// This component establishes the dynamic route /gaming/accessories/[headset] which will display a single gaming headset product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function HeadsetPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="gamingAccessoriesHeadsets" />
            <ProductPage id={params.headset} />
        </div>
    );
}