import Image from "next/image";
import Link from "next/link";
import ConsultationButton from "@/Components/ConsultationButton";
import { CONTACT, SERVICES, servicePath } from "@/lib/site";

const exploreLinks = [
  ["Work", "/work"],
  ["Technology", "/#technology"],
  ["Approach", "/#approach"],
  ["FAQ", "/#faq"],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12 md:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1.15fr_0.8fr_0.9fr]">
        <div>
          <Link href="/" scroll aria-label="Optimion home"><Image src="/Optimi logo 2025 (10).png" alt="Optimion" width={140} height={34} className="h-7 w-auto" /></Link>
          <p className="mt-4 max-w-sm leading-relaxed text-gray-400">AI automation, systems integration, ERP/CRM engineering, business intelligence, and custom operational software.</p>
          <p className="mt-4 text-sm text-gray-500">We connect and automate the systems that run your business.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-300">Services</h2>
          <ul className="mt-4 grid gap-2 text-sm text-gray-400">
            {SERVICES.map((service) => <li key={service.slug}><Link href={servicePath(service.slug)} scroll data-footer-service={service.slug} className="hover:text-white">{service.name}</Link></li>)}
            <li><Link href="/services" scroll className="font-medium text-cyan-300 hover:text-cyan-200">View all services</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-300">Explore</h2>
          <ul className="mt-4 grid gap-2 text-sm text-gray-400">
            {exploreLinks.map(([label, href]) => <li key={href}><Link href={href} scroll className="hover:text-white">{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-300">Contact</h2>
          <div className="mt-4 space-y-3 text-sm">
            <a href={`mailto:${CONTACT.email}`} className="block text-gray-300 hover:text-white" data-evt="contact_click" data-place="footer" data-kind="email">{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone}`} className="block text-gray-300 hover:text-white" data-evt="contact_click" data-place="footer" data-kind="phone">{CONTACT.phoneDisplay}</a>
            <ConsultationButton place="footer" label="Book Consultation" compact />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Optimion. All rights reserved.</span>
        <div className="flex gap-4"><Link href="/privacy" scroll className="hover:text-white">Privacy</Link><Link href="/terms" scroll className="hover:text-white">Terms</Link></div>
      </div>
    </footer>
  );
}
