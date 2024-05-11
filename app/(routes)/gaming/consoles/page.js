// This component establishes the route /consoles which will display a list of gaming consoles.
import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Consoles from '@/app/components/consoles';

export default function ConsolesPage() {
    return (
        <>
            <Breadcrumbs category="gamingConsoles" />
            <Consoles />
        </>
    );
}
