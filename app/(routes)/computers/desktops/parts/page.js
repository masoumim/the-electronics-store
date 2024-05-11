// This component establishes the route /computers-desktops-parts which will display a list of desktop parts.
import 'server-only';

import Breadcrumbs from '@/app/components/breadcrumbs';
import Parts from '@/app/components/parts';


export default function PartsPage() {
    return (
        <>
            <Breadcrumbs category="computersDesktopsParts" />
            <Parts />            
        </>
    );
}