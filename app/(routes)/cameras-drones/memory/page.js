import 'server-only';
import CamerasMemory from '@/app/components/cameras-memory';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function CamerasMemoryPage() {
    return (
        <>
            <Breadcrumbs category="camerasMemory" />
            <CamerasMemory />
        </>
    );
}