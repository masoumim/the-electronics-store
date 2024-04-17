import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Mem from '@/app/components/mem';

export default function ComputerPartsMem() {
    return (
        <>
            <Breadcrumbs category="computerDesktopPartsMem" />
            <Mem />
        </>
    );
}