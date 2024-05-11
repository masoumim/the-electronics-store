// This component establishes the route /home-electronics/appliances which will display a list of home electronics appliances.
import 'server-only';
import Appliances from '@/app/components/appliances';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function AppliancesPage() {
    return (
        <>
            <Breadcrumbs category="homeElectronicsAppliances" />
            <Appliances />
        </>
    );
}