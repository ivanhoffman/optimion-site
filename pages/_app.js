// pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

const GA_MEASUREMENT_ID = "G-GWBX9F3PLV";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Smoothly scroll to a hash after route changes (and on first load)
  useEffect(() => {
    const scrollToHash = (url) => {
      const candidate =
        typeof url === "string"
          ? url
          : window.location.pathname + window.location.hash;
      const hash = candidate.split("#")[1];
      if (!hash) return;

      requestAnimationFrame(() => {
        const el =
          document.getElementById(hash) ||
          document.querySelector(`#${CSS.escape(hash)}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    // Initial load (covers direct hit to /#faq)
    scrollToHash(router.asPath);

    // After client-side route changes
    router.events.on("routeChangeComplete", scrollToHash);
    return () => router.events.off("routeChangeComplete", scrollToHash);
  }, [router.events, router.asPath]);

  // GA4: send page_view on client-side route changes
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window.gtag === "function") {
        window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
      } else if (window.dataLayer) {
        window.dataLayer.push({ event: "page_view", page_path: url });
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

      <Header variant="site" />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
