// This component establishes the route /gaming/accessories/headsets which will display a list of headsets.
import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Headsets from '@/app/components/headsets';

export default function HeadsetsPage() {
    return (
        <>
            <Breadcrumbs category="gamingAccessoriesHeadsets" />
            <Headsets />
        </>
    );
}