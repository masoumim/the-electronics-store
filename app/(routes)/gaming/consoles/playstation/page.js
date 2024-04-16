import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Playstation from '@/app/components/playstation';

export default function PlaystationPage() {
    return (
        <>
            <Breadcrumbs category="gamingConsolesPlaystation" />
            <Playstation />
        </>
    );
}