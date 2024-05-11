// This component establishes the route /cameras-drones/point-and-shoot which will display a list of point-and-shoot cameras.
import 'server-only';
import CamerasPointAndShoot from '@/app/components/point-and-shoot';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function CamerasPointAndShootPage() {
    return (
        <>
            <Breadcrumbs category="camerasPointAndShoot" />
            <CamerasPointAndShoot />
        </>
    );
}