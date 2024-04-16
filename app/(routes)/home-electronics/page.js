import 'server-only';
import HomeElectronics from '@/app/components/home-electronics';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default function HomeElectronicsPage() {
  return (
    <>
      <Breadcrumbs category="HomeElectronics" />
      <HomeElectronics />
    </>
  );
}