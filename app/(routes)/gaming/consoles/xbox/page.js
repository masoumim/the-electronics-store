import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Xbox from '@/app/components/xbox';

export default function XboxPage() {
    return (
        <>
            <Breadcrumbs category="gamingConsolesXbox" />
            <Xbox />
        </>
    );
}

