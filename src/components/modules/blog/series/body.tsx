import React from "react";

import { PostItem } from "@/components/modules/blog/post/post-item";
import Col from "@/components/ui/col";

export default function Body({
  contentfulBlogSeries,
}: Queries.SeriesBySlugQuery) {
  return (
    <Col className="space-y-4 md:basis-2/3">
      {contentfulBlogSeries?.posts?.map((post) => (
        <PostItem key={post!.id} {...post!} isSeries />
      ))}
    </Col>
  );
}
