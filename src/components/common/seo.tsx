import React from "react";

import { SiteMetadata, useSiteMetadata } from "@/hooks/use-site-metadata";

interface SeoProps extends Partial<SiteMetadata> {
  pathname?: string;
  children?: React.ReactNode;
}

export const Seo = ({
  title,
  description,
  image,
  pathname,
  children,
}: SeoProps) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata();

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description ?? defaultDescription,
    image: `${siteUrl}${image ?? defaultImage}`,
    url: `${siteUrl}${pathname ?? ""}`,
    twitterUsername,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      {children}
    </>
  );
};
