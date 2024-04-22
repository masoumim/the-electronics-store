// This component establishes the dynamic route /cameras-drones/memory/[memory] which will display a single memory product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function MemoryPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="camerasMemory" />
            <ProductPage id={params.memory} />
        </div>
    );
}