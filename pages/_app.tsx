import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { OcorrenciasProvider } from '../context/ocorrencias';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OcorrenciasProvider>
      <Component {...pageProps} />
    </OcorrenciasProvider>
  );
}

export default MyApp;
