import ServicePage from "@/Components/ServicePage";
import { SERVICE_PAGES, SERVICE_SLUGS } from "@/lib/site";

export default function ServiceRoute({ service, slug }) {
  return <ServicePage service={service} slug={slug} />;
}

export function getStaticPaths() {
  return {
    paths: SERVICE_SLUGS.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const service = SERVICE_PAGES[params.slug];
  if (!service) return { notFound: true };
  return { props: { service, slug: params.slug } };
}

