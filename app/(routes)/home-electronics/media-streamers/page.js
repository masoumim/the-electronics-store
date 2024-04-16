import 'server-only';
import MediaStreamers from '@/app/components/media-streamers';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function MediaStreamersPage() {
    return (
        <>
            <Breadcrumbs category="HomeElectronicsMediaStreamers" />
            <MediaStreamers />
        </>
    );
}