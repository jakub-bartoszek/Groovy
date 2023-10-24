import { AccountBar } from '../components/AccountBar';
import { Center } from '../components/Dashboard';
import { Sidebar } from '../components/Sidebar';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from './layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
