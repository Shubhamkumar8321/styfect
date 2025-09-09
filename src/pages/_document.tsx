// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Styfect - Elegant Curtains for Every Home</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
