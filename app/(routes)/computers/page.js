// This component establishes the route /computers which will display all of the products in the computers category.
import 'server-only';
import Computers from '@/app/components/computers';

export default function ComputersPage() {
  return (
    <>
      <Computers />
    </>
  );
}