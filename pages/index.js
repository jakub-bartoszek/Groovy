
import styles from '../styles/Home.module.css';
import { Sidebar } from '../components/Sidebar';
import { Center } from '../components/Center';

export default function Home() {
  return (
    <div className='h-screen bg-black text-white grid grid-rows-[1fr_100px]'>
      <main className='h-full grid grid-cols-[auto_1fr] p-2 overflow-hidden'>
        <Sidebar />
        <Center />
      </main>
      <div className='bg-slate-600'>Player</div>
    </div>
  );
}
