// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import Layout from '@/components/layout';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Styfect - Elegant Curtains for Every Home</title>
        <meta name="description" content="Your site description here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>{`
							html {
								font-family: ${poppins.style.fontFamily};
							}
						`}</style>
      <Component {...pageProps} />
    </Layout>
  );
}
