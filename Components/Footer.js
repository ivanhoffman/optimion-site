// Components/Footer.js
"use client";

import Link from "next/link";

function ArrowUpRightIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M7 17L17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-7xl px-6 md:px-16 py-8 text-sm text-gray-300 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        {/* Left: Brand + Contact */}
        <div className="text-center md:text-left">
          <div className="font-semibold text-white">Optimion</div>
          <div className="text-gray-400 mt-1">CRM • Automation • Integration</div>

          {/* Microcopy */}
          <p className="mt-3 text-gray-400">
            Questions? Call or email—response within 1 business day.
          </p>

          {/* Contact options */}
          <div className="mt-2 space-y-1">
            <a
              href="tel:+19545430779"
              className="inline-flex items-center gap-1 hover:text-white"
              aria-label="Call Optimion at (954) 543-0779"
            >
              <ArrowUpRightIcon className="w-3.5 h-3.5 opacity-70" />
              <span>(954) 543-0779</span>
            </a>
            <a
              href="mailto:hello@optimion.us"
              className="inline-flex items-center gap-1 hover:text-white"
              aria-label="Email Optimion at hello@optimion.us"
            >
              <ArrowUpRightIcon className="w-3.5 h-3.5 opacity-70" />
              <span>hello@optimion.us</span>
            </a>
          </div>
        </div>

        {/* Middle: Links (unchanged) */}
        <div className="flex items-center gap-4 text-gray-400">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/#faq" className="hover:text-white" prefetch={false}>
            FAQ
          </Link>
        </div>

        {/* Right: Copyright (unchanged) */}
        <div className="text-gray-500">© {year} Optimion. All rights reserved.</div>
      </div>
    </footer>
  );
}
