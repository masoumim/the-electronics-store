// This component establishes the route /cameras-drones/action which will display a list of action cameras.
import 'server-only';
import CamerasAction from '@/app/components/cameras-action';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function CamerasActionPage() {
    return (
        <>
            <Breadcrumbs category="camerasAction" />
            <CamerasAction />
        </>
    );
}