// This component establishes the route /computers/desktops which will display a list of desktop computers.
import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Desktops from '@/app/components/desktops';

export default function DesktopsPage() {
    return (
        <>
            <Breadcrumbs category="computersDesktops" />
            <Desktops />
        </>
    );
}