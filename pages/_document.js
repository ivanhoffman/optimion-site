// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PQJFJPTW";

  return (
    <Html lang="en">
      <Head>
        {/* Performance: speed up Cal.com embed */}
        <link rel="preconnect" href="https://cal.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://app.cal.com" crossOrigin="anonymous" />

        {/* Favicon & app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
