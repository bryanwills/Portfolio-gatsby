import { Link } from "gatsby";
import React from "react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

import { PostItem } from "../blog/post/post-item";

export default function LatestBlogPosts({
  nodes,
}: Readonly<Queries.HomePageQuery["allContentfulBlogPost"]>) {
  return (
    <div className="space-y-16">
      <Row className="justify-between">
        <Heading level={2}>Latest Blog Posts</Heading>
        <Link to={siteConfig.pages.blog.link}>
          <Button>View All</Button>
        </Link>
      </Row>
      <div className="gap-10 grid md:grid-cols-2">
        {nodes.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
