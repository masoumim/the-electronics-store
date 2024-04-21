// This component establishes the dynamic route /gaming/consoles/playstation/[playstation] which will display a single Playstation console product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function PlaystationPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="gamingConsolesPlaystation" />
            <ProductPage id={params.playstation} />
        </div>
    );
}