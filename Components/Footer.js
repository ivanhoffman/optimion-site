// Components/Footer.js
"use client";

import Link from "next/link";

// Minimal inline icons (no extra packages)
function PhoneIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M5 4a2 2 0 0 1 2-2h1.2a1 1 0 0 1 .95.68l1.1 3.28a1 1 0 0 1-.26 1.04l-1.2 1.2a12.5 12.5 0 0 0 6.01 6.01l1.2-1.2a1 1 0 0 1 1.04-.26l3.28 1.1a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C10.61 21 3 13.39 3 4.99V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function MailIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 7l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-7xl px-6 md:px-16 py-8 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* Left: Brand + Contact */}
        <div className="text-center md:text-left">
          <div className="font-semibold text-white">Optimion</div>
          <div className="text-gray-400 mt-1">CRM • Automation • Integration</div>

          <p className="mt-3 text-gray-400">
            Questions? Call or email—response within 1 business day.
          </p>

          {/* Contact chips */}
          <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap gap-2">
            <a
              href="tel:+19545430779"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 hover:bg-white/5 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Call Optimion at (954) 543-0779"
            >
              <PhoneIcon className="w-4 h-4 opacity-80" />
              <span>(954) 543-0779</span>
            </a>

            <a
              href="mailto:hello@optimion.us"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 hover:bg-white/5 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Email Optimion at hello@optimion.us"
            >
              <MailIcon className="w-4 h-4 opacity-80" />
              <span>hello@optimion.us</span>
            </a>
          </div>
        </div>

        {/* Middle: Links (centered) */}
        <div className="flex md:justify-center items-center gap-4 text-gray-400">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <span className="hidden md:inline text-gray-600">•</span>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <span className="hidden md:inline text-gray-600">•</span>
          <Link href="/#faq" className="hover:text-white" prefetch={false}>
            FAQ
          </Link>
        </div>

        {/* Right: Copyright (right on desktop, centered on mobile) */}
        <div className="text-center md:text-right text-gray-500">
          © {year} Optimion. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
