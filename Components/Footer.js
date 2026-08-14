import Image from "next/image";
import Link from "next/link";
import { CONTACT, SERVICES, servicePath } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12 md:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image src="/Optimi logo 2025 (10).png" alt="Optimion" width={140} height={34} className="h-7 w-auto" />
          <p className="mt-4 max-w-sm leading-relaxed text-gray-400">AI automation, systems integration, ERP/CRM engineering, business intelligence, and custom operational software.</p>
          <p className="mt-4 text-sm text-gray-500">We connect and automate the systems that run your business.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-300">Services</h2>
          <ul className="mt-4 grid gap-2 text-sm text-gray-400">
            {SERVICES.slice(0, 6).map((service) => <li key={service.slug}><Link href={servicePath(service.slug)} className="hover:text-white">{service.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-300">Contact</h2>
          <div className="mt-4 space-y-3 text-sm">
            <a href={`tel:${CONTACT.phone}`} className="block text-gray-300 hover:text-white" data-evt="contact_click" data-place="footer" data-kind="phone">{CONTACT.phoneDisplay}</a>
            <a href={`mailto:${CONTACT.email}`} className="block text-gray-300 hover:text-white" data-evt="contact_click" data-place="footer" data-kind="email">{CONTACT.email}</a>
            <a href="https://ivanhoffman.io" target="_blank" rel="noreferrer" className="block text-gray-400 hover:text-white">Founder&apos;s technical portfolio</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Optimion. All rights reserved.</span>
        <div className="flex gap-4"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link><Link href="/work" className="hover:text-white">Selected Work</Link></div>
      </div>
    </footer>
  );
}
