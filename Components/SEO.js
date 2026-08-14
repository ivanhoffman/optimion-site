import Head from "next/head";
import { absoluteUrl } from "@/lib/site";

const DEFAULT_IMAGE = absoluteUrl("/android-chrome-512x512.png");

export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd = [],
  noIndex = false,
}) {
  const canonical = absoluteUrl(path);
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large"} />
      <meta name="googlebot" content={noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large"} />
      <link rel="canonical" href={canonical} />
      <meta name="theme-color" content="#050505" />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Optimion" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image.startsWith("http") ? image : absoluteUrl(image)} />
      <meta property="og:image:alt" content="Optimion — AI automation, systems integration, and business intelligence" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith("http") ? image : absoluteUrl(image)} />

      {schemas.filter(Boolean).map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </Head>
  );
}

