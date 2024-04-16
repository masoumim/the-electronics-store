import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Cpu from '@/app/components/cpu';



export default function ComputerPartsCpu() {
    return (
        <>
            <Breadcrumbs category="computersDesktopsPartsCpus" />
            <Cpu />
        </>
    );
}