import 'server-only';
import CamerasDslr from '@/app/components/cameras-dslr';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function CamerasDslPage() {
    return (
        <>
            <Breadcrumbs category="CamerasDsl" />
            <CamerasDslr />
        </>
    );
}