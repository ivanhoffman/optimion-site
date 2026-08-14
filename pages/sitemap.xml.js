import { CASE_STUDY_SLUGS, SERVICE_SLUGS, SITE_URL, caseStudyPath, servicePath } from "@/lib/site";

const publicPaths = ["/", "/services", ...SERVICE_SLUGS.map(servicePath), "/work", ...CASE_STUDY_SLUGS.map(caseStudyPath), "/privacy", "/terms"];

function xmlEscape(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildSitemap() {
  const urls = publicPaths
    .map((path) => `  <url><loc>${xmlEscape(`${SITE_URL}${path}`)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default function Sitemap() {
  return null;
}

export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  res.write(buildSitemap());
  res.end();
  return { props: {} };
}

