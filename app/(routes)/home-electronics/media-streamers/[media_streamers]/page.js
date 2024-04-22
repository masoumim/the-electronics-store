// This component establishes the dynamic route /home-electronics/media-streamers/[media_streamers] which will display a single media streamer product.
import 'server-only';
import ProductPage from '@/app/components/product-page';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function MediaStreamersPage({ params }) {
    return (
        <div>
            <Breadcrumbs category="homeElectronicsMediaStreamers" />
            <ProductPage id={params.media_streamers} />
        </div>
    );
}