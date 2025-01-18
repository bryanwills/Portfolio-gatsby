import React from "react";

import Body from "./body";
import Header from "./header";

export default function Series({
  contentfulBlogSeries,
}: Queries.SeriesBySlugQuery) {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <Header contentfulBlogSeries={contentfulBlogSeries} />
      <Body contentfulBlogSeries={contentfulBlogSeries} />
    </div>
  );
}
