import { SITE_URL } from "@/lib/site";

const robots = `User-agent: OAI-AdsBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

export default function Robots() {
  return null;
}

export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  res.write(robots);
  res.end();
  return { props: {} };
}

