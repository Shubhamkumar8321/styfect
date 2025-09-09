// import { AppProps } from "next/app";
// import "@/styles/globals.css";
// import Layout from "@/components/layout";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }


// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Styfect</title>
        <meta name="description" content="Your site description here" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
