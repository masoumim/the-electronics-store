// This component establishes the dynamic route /home-electronics/speakers/[speaker] which will display a single speaker product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function SpeakerPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="homeElectronicsSpeakers" />
            <ProductPage id={params.speaker} />
        </div>
    );
}
