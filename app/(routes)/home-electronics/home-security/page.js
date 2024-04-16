import 'server-only';
import HomeSecurity from '@/app/components/home-security';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function HomeSecurityPage() {
    return (
        <>
            <Breadcrumbs category="HomeElectronicsHomeSecurity" />
            <HomeSecurity />
        </>
    );
}