// This component establishes the route /accessories which will display all of the products in the gaming accessories category.
import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Accessories from '@/app/components/accessories';

export default function AccessoriesPage() {
    return (
        <>
            <Breadcrumbs category="gamingAccessories" />
            <Accessories />
        </>
    );
}