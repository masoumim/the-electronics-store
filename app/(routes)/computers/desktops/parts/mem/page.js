import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Mem from '@/app/components/mem';

export default function ComputerPartsCpu() {
    return (
        <>
            <Breadcrumbs category="computerDesktopPartsMem" />
            <Mem />
        </>
    );
}