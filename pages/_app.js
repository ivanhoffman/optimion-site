// pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { gaEvent } from "@/lib/gtag"; // <-- uses your gtag helper

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
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "page_view",
          page_path: url,
          page_location: window.location.href,
          page_title: document.title,
        });
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  // Global listener: any element with data-evt="..." auto-sends via gaEvent
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest?.("[data-evt]");
      if (!el) return;

      // dataset => { evt: 'cta_click', place: 'hero', ... }
      const { evt, ...rest } = el.dataset;
      const action = evt || "interaction";
      const params = { ...rest };

      // coerce numeric-looking strings to numbers (helps in GA4)
      Object.keys(params).forEach((k) => {
        const v = params[k];
        if (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v))) {
          params[k] = Number(v);
        }
      });

      gaEvent(action, params);
    };

    // Track <details data-evt="faq_open" ...> when it opens
    const onToggle = (e) => {
      const el = e.target;
      if (el?.matches?.('details[data-evt]') && el.open) {
        const { evt, ...rest } = el.dataset;
        gaEvent(evt || "details_open", { ...rest });
      }
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

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
    </>
  );
}
