// This component establishes the route /home-security which will display home security products.
import 'server-only';
import HomeSecurity from '@/app/components/home-security';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function HomeSecurityPage() {
    return (
        <>
            <Breadcrumbs category="homeElectronicsHomeSecurity" />
            <HomeSecurity />
        </>
    );
}