// This component establishes the route /computers/desktops/parts/cpu which will display the CPU products.
import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Cpu from '@/app/components/cpu';

export default function ComputerPartsCpu() {
    return (
        <>
            <Breadcrumbs category="computersDesktopsPartsCpus" />
            <Cpu/>
        </>
    );
}