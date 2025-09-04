// pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import AnalyticsBridge from "@/Components/AnalyticsBridge"; // NEW: centralizes data-evt → GTM/GA4

// Use env var if present, fall back to your GTM container ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PQJFJPTW";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Smoothly scroll to a hash after route changes (and on first load)
  useEffect(() => {
    const scrollToHash = (url) => {
      const candidate =
        typeof url === "string" ? url : window.location.pathname + window.location.hash;
      const hash = candidate.split("#")[1];
      if (!hash) return;

      requestAnimationFrame(() => {
        const el =
          document.getElementById(hash) ||
          document.querySelector(`#${CSS.escape(hash)}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    scrollToHash(router.asPath); // initial load
    router.events.on("routeChangeComplete", scrollToHash);
    return () => router.events.off("routeChangeComplete", scrollToHash);
  }, [router.events, router.asPath]);

  // Push virtual pageviews for SPA navigations to GTM
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      <Header variant="site" />
      <Component {...pageProps} />
      <Footer />

      {/* Mount once, after your app */}
      <AnalyticsBridge />
    </>
  );
}
