import React from "react";

import { Heading } from "@/components/ui/heading";

import { PostItem } from "../home/latest-blog-posts";

export default function PostsList({
  nodes,
}: Queries.BlogPageQuery["allContentfulBlogPost"]) {
  return (
    <div className="space-y-16">
      <Heading level={1}>Blog</Heading>
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
