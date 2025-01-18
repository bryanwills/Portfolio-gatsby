import React from "react";

import { PostItem } from "@/components/modules/blog/post/post-item";
import { Heading } from "@/components/ui/heading";

export default function PostsList({
  nodes,
}: Queries.BlogPageQuery["allContentfulBlogPost"]) {
  return (
    <div className="space-y-8">
      <Heading level={3}>Posts</Heading>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes
          .filter((post) => post.isFeatured)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
        {nodes
          .filter((post) => !post.isFeatured)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
      </div>
    </div>
  );
}
