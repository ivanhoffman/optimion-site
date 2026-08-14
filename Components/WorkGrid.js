"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES, WORK_FILTERS, caseStudyPath } from "@/lib/site";

export default function WorkGrid({ limit, showFilters = false }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const projects = useMemo(() => {
    const entries = Object.values(CASE_STUDIES);
    const filtered = activeFilter === "All"
      ? entries
      : entries.filter((project) => project.category.includes(activeFilter));
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [activeFilter, limit]);

  return (
    <>
      {showFilters ? (
        <div role="tablist" aria-label="Filter selected work" className="mt-10 flex flex-wrap gap-2">
          {WORK_FILTERS.map((filter) => {
            const active = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={active}
                data-work-filter={filter}
                onClick={() => setActiveFilter(filter)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-cyan-300/50 bg-cyan-300/10 text-white"
                    : "border-white/10 bg-white/[0.025] text-gray-300 hover:border-white/25 hover:text-white"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.slug} className="surface-card group overflow-hidden">
            <Link href={caseStudyPath(project.slug)} scroll className="block">
              <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-black/40">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </Link>
            <div className="p-6 md:p-7">
              <ul className="flex flex-wrap gap-2" aria-label={`${project.title} categories`}>
                {project.category.map((category) => (
                  <li key={category} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-wide text-gray-400">
                    {category}
                  </li>
                ))}
              </ul>
              <h3 className="mt-5 text-2xl font-semibold text-white">
                <Link href={caseStudyPath(project.slug)} scroll className="hover:text-cyan-200">{project.title}</Link>
              </h3>
              <p className="mt-3 leading-relaxed text-gray-300">{project.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{project.impact}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                {project.technologies.map((tech) => (
                  <li key={tech} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-gray-300">{tech}</li>
                ))}
              </ul>
              <Link href={caseStudyPath(project.slug)} scroll className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200">
                View case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      {projects.length === 0 ? <p className="mt-10 text-gray-400">No implementation examples match this category yet.</p> : null}
    </>
  );
}
