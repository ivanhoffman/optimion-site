// pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Smoothly scroll to a hash after route changes (and on first load)
  useEffect(() => {
    const scrollToHash = (url) => {
      // url is provided on routeChangeComplete; fall back to current location
      const candidate = typeof url === "string" ? url : window.location.pathname + window.location.hash;
      const hash = candidate.split("#")[1];
      if (!hash) return;

      // Wait a tick so layout is ready, then scroll
      requestAnimationFrame(() => {
        const el = document.getElementById(hash) || document.querySelector(`#${CSS.escape(hash)}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    // Initial load (covers direct hit to /#faq)
    scrollToHash(router.asPath);

    // After client-side route changes
    router.events.on("routeChangeComplete", scrollToHash);
    return () => router.events.off("routeChangeComplete", scrollToHash);
  }, [router.events, router.asPath]);

  return (
    <>
      <Header variant="site" />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
