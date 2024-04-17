import 'server-only';
import CamerasPointAndShoot from '@/app/components/point-and-shoot';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function CamerasPointAndShootPage() {
    return (
        <>
            <Breadcrumbs category="CamerasPointAndShoot" />
            <CamerasPointAndShoot />
        </>
    );
}