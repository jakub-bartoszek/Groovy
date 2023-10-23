import { AccountBar } from '../components/AccountBar';
import { Sidebar } from '../components/Sidebar';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <SessionProvider session={session}>
      <div className='h-screen bg-black text-white grid grid-rows-[1fr_100px] overflow-hidden'>
        <div className='h-full grid grid-cols-[auto_1fr] p-2 gap-2 overflow-hidden bg-yellow-500'>
          <Sidebar /> 
          <div className='h-full overflow-hidden flex flex-col bg-blue-500'>
            <Component {...pageProps} />
          </div>
        </div>
        <div className='bg-slate-600'>Player</div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
