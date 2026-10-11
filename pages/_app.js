// pages/_app.js
import "../styles/globals.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import AnalyticsBridge from "@/Components/AnalyticsBridge";
import OpenAIAdsPixel from "@/Components/OpenAIAdsPixel";
import { captureAttribution, newEventId, serviceFromPath } from "@/lib/attribution";
import { gaEvent, measureOpenAI } from "@/lib/gtag";

// Use env var if present, fall back to your GTM container ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PQJFJPTW";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const lastMeasuredPage = useRef("");

  // Restore predictable navigation for both the window and the desktop body scrollport.
  useEffect(() => {
    const restoreRouteScroll = (url) => {
      const candidate =
        typeof url === "string" ? url : window.location.pathname + window.location.hash;
      const hash = candidate.split("#")[1];

      requestAnimationFrame(() => {
        if (!hash) {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          return;
        }
        const el =
          document.getElementById(hash) ||
          document.querySelector(`#${CSS.escape(hash)}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    restoreRouteScroll(router.asPath);
    router.events.on("routeChangeComplete", restoreRouteScroll);
    return () => router.events.off("routeChangeComplete", restoreRouteScroll);
  }, [router.events, router.asPath]);

  // Capture first-party campaign context before measuring initial or SPA views.
  useEffect(() => {
    if (!router.isReady) return;
    const measurePage = (virtual = false) => {
      const routeKey = window.location.pathname + window.location.search;
      if (lastMeasuredPage.current === routeKey) return;
      lastMeasuredPage.current = routeKey;
      captureAttribution();
      const path = window.location.pathname;
      const params = { page_path: path, page_location: window.location.origin + path, page_title: document.title };
      // GTM's Google tag measures the initial page; only SPA views need a page_view push.
      if (virtual) gaEvent("page_view", params);
      if (serviceFromPath(path)) gaEvent("landing_page_view", params);
      measureOpenAI("page_viewed", {
        type: "contents",
        contents: [{ id: path, name: document.title, content_type: "page" }],
      }, { event_id: newEventId("page") });
    };
    measurePage();
    const handleRouteChange = () => measurePage(true);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events, router.isReady]);

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

      <OpenAIAdsPixel />

      <Header variant="site" />
      <Component {...pageProps} />
      <Footer />

      {/* Mount once, after your app */}
      <AnalyticsBridge />
    </>
  );
}
