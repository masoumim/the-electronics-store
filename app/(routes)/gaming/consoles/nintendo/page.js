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