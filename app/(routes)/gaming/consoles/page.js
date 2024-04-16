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
