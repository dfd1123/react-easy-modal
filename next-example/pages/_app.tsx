import '@/styles/animation.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ModalProvider } from 'react-easy-modal';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <ModalProvider className="wemade-md" pathname={pathname}>
      <Component {...pageProps} />
    </ModalProvider>
  );
}
