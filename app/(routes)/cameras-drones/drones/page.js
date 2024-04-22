import 'server-only';
import Drones from '@/app/components/drones';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function DronesPage() {
    return (
        <>
            <Breadcrumbs category="drones" />
            <Drones />
        </>
    );
}