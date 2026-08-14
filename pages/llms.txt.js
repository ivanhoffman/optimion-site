import { SERVICE_SLUGS, SITE_URL, SERVICE_PAGES, servicePath } from "@/lib/site";

function buildLlmsTxt() {
  const services = SERVICE_SLUGS.map((slug) => `- ${SERVICE_PAGES[slug].h1}: ${SITE_URL}${servicePath(slug)}`).join("\n");
  return `# Optimion

Optimion is a business systems engineering company focused on AI automation, systems integration, ERP and CRM workflows, business intelligence, and custom operational software.

## Services
${services}

## Selected public work
- Selected systems and automation work: ${SITE_URL}/work
- Founder's detailed technical portfolio: https://ivanhoffman.io

## Contact
- Website: ${SITE_URL}/
- Consultation: ${SITE_URL}/#get-started
- Email: hello@optimion.us
`;
}

export default function LlmsTxt() {
  return null;
}

export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  res.write(buildLlmsTxt());
  res.end();
  return { props: {} };
}

