// pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Smoothly scroll to hash after route changes (and on first load).
  useEffect(() => {
    const handle = (url) => {
      const hash = url.split("#")[1];
      if (!hash) return;
      // wait a tick so the page has rendered
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    router.events.on("routeChangeComplete", handle);
    handle(router.asPath); // handle initial load with hash

    return () => router.events.off("routeChangeComplete", handle);
  }, [router]);

  return (
    <>
      <Header variant="site" />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
