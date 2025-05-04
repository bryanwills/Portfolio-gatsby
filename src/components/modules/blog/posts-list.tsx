import React, { useState } from "react";

import { Icons } from "@/assets/icons";
import { PostItem } from "@/components/modules/blog/post/post-item";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/reusables/input";

export default function PostsList({
  nodes,
}: Queries.BlogPageQuery["allContentfulBlogPost"]) {
  const [posts, setPosts] =
    useState<Queries.BlogPageQuery["allContentfulBlogPost"]["nodes"]>(nodes);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPosts = nodes.filter(
      (post) =>
        post.title?.toLowerCase().includes(searchTerm) ||
        post.excerpt?.toLowerCase().includes(searchTerm)
    );
    setPosts(filteredPosts);
  };

  return (
    <div className="space-y-8">
      <Heading level={3}>Posts</Heading>
      <div className="relative">
        <Icons.Search className="absolute top-3 right-3 text-muted-foreground" />
        <Input onChange={handleSearch} placeholder="Search posts..." />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* show featured posts first */}
        {posts
          .filter((post) => post.isFeatured)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}

        {posts
          .filter((post) => !post.isFeatured)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
      </div>
    </div>
  );
}
