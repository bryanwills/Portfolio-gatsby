import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export default function Header({
  contentfulBlogSeries,
}: Queries.SeriesBySlugQuery) {
  const { title, cover, description, posts } = contentfulBlogSeries!;

  return (
    <aside className="md:basis-1/3 space-y-4 md:sticky md:top-4 md:h-full">
      <GatsbyImage
        image={cover?.gatsbyImageData!}
        alt={title!}
        className="rounded-xl"
      />
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-sm">{description}</p>
      <span className="text-sm text-muted-foreground">
        Series ・ {posts?.length} Posts
      </span>
    </aside>
  );
}
