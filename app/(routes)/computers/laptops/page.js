import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Laptops from '@/app/components/laptops';

export default function LaptopsPage () {
    return (
        <>
            <Breadcrumbs category="computersLaptops" />
            <Laptops />
        </>
    );
}