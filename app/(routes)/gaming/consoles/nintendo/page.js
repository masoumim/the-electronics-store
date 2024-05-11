// This component establishes the route /gaming/consoles/nintendo which will display all of the products in the gaming consoles Nintendo category.
import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Nintendo from '@/app/components/nintendo';

export default function NintendoPage() {
    return (
        <>
            <Breadcrumbs category="gamingConsolesNintendo" />
            <Nintendo />
        </>
    );
}