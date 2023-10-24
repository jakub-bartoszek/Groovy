import { Sidebar } from '../components/Sidebar';
import { Center } from '../components/Dashboard';

export default function Home() {
  return (
    <div className='h-full overflow-hidden'>
      <main className='h-full overflow-hidden'>
        <Center />
      </main>
    </div>
  );
}
