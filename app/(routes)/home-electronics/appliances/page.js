import 'server-only';
import Appliances from '@/app/components/appliances';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function AppliancesPage() {
    return (
        <>
            <Breadcrumbs category="HomeElectronicsAppliances" />
            <Appliances />
        </>
    );
}