// The component establishes the route /gaming/consoles/xbox which will display Xbox consoles.
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

