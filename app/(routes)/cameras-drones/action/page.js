import 'server-only';
import CamerasAction from '@/app/components/cameras-action';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function CamerasActionPage() {
    return (
        <>
            <Breadcrumbs category="CamerasAction" />
            <CamerasAction />
        </>
    );
}