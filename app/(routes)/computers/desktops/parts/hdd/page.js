import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Hdd from '@/app/components/hdd';

export default function Desktop() {
    return (
        <>
            <Breadcrumbs category="computerDesktopPartsHdd" />
            <Hdd />
        </>
    );
}