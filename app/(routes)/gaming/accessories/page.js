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