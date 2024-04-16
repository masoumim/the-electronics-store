import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Controllers from '@/app/components/controllers';

export default function ControllersPage() {
    return (
        <>
            <Breadcrumbs category="gamingAccessoriesControllers" />
            <Controllers />
        </>
    );
}