// This component establishes the route /media-streamers which will display media streamers.
import 'server-only';
import MediaStreamers from '@/app/components/media-streamers';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function MediaStreamersPage() {
    return (
        <>
            <Breadcrumbs category="homeElectronicsMediaStreamers" />
            <MediaStreamers />
        </>
    );
}