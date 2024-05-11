// This component establishes the route /speakers which will display speakers.
import 'server-only';
import Speakers from '@/app/components/speakers';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function SpeakersPage() {
    return (
        <>
            <Breadcrumbs category="homeElectronicsSpeakers" />
            <Speakers />
        </>
    );
}