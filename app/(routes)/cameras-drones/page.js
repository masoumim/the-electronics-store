// This component establishes the route /cameras-drones which will display a list of everything in the cameras and drones category.
import 'server-only';
import CamerasDrones from '@/app/components/cameras-drones';

export default function CamerasDronesPage() {
    return (
        <>
            <CamerasDrones />
        </>
    );
}