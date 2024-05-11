// This component establishes the route /computers-laptops which will display a list of laptops.
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