import SolutionPage from "@/Components/SolutionPage";
import { SOLUTION_PAGES, SOLUTION_SLUGS } from "@/lib/solutions";

export default function SolutionRoute({ solution, slug }) {
  return <SolutionPage solution={solution} slug={slug} />;
}

export function getStaticPaths() {
  return {
    paths: SOLUTION_SLUGS.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const solution = SOLUTION_PAGES[params.slug];
  if (!solution) return { notFound: true };
  return { props: { solution, slug: params.slug } };
}
