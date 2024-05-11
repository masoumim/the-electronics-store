// This component establishes the route /gaming/accessories/controllers which will display a list of gaming controllers.
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