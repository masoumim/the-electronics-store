// This component establishes the route /televisions which will display televisions.
import 'server-only';
import Televisions from '@/app/components/televisions';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function TelevisionsPage() {
    return (
        <>
            <Breadcrumbs category="homeElectronicsTelevisions" />
            <Televisions />
        </>
    );
}