import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ModalProvider } from 'react-easy-modal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider showDim={false} className="wemade-md">
      <Component {...pageProps} />
    </ModalProvider>
  );
}
