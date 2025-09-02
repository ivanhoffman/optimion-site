// Components/Footer.js
"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-7xl px-6 md:px-16 py-8 text-sm text-gray-300 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="font-semibold text-white">Optimion</div>
          <div className="text-gray-400 mt-1">CRM • Automation • Integration</div>
          {/* Optional: add city/phone/email for trust (NAP) */}
          {/* <div className="mt-1 text-gray-400">New York, NY • support@optimion.com</div> */}
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          {/* Internal links use Next.js <Link> for proper routing */}
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          {/* Always go to the homepage FAQ anchor */}
          <Link href="/#faq" className="hover:text-white" prefetch={false}>
            FAQ
          </Link>
        </div>

        <div className="text-gray-500">© {year} Optimion. All rights reserved.</div>
      </div>
    </footer>
  );
}
