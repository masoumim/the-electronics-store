// This component establishes the route /cameras-dslr which will display a list of DSLR cameras.
import 'server-only';
import CamerasDslr from '@/app/components/cameras-dslr';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function CamerasDslrPage() {
    return (
        <>
            <Breadcrumbs category="camerasDslr" />
            <CamerasDslr />
        </>
    );
}