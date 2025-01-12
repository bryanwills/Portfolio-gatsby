import Giscus from "@giscus/react";
import React from "react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

import { PostItem } from "../../home/latest-blog-posts";

export default function Footer({
  post,
}: {
  post: Queries.PostBySlugQuery["contentfulBlogPost"];
}) {
  return (
    <div className="not-prose space-y-16">
      <Row className="justify-between rounded-xl bg-chart-6 p-8 text-black flex-col md:flex-row gap-4">
        <p className="font-bold">Loved this post?</p>
        <a href={siteConfig.links.donate} target="_blank" rel="noreferrer">
          <Button variant={"secondary"}>🍕 Buy me a pizza</Button>
        </a>
      </Row>
      <Heading level={3}>Comments</Heading>
      <div>
        <Giscus
          id="comments"
          repo="itsrakeshhq/blog-comments"
          repoId="R_kgDOHjIGkg"
          category="Comments"
          categoryId="DIC_kwDOHjIGks4CP1dS"
          mapping="url"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="noborder_dark"
          lang="en"
        />
      </div>
      {post?.recommendedPosts?.length && (
        <div className="space-y-16">
          <Heading level={3}>Recommended</Heading>
          <div className="grid md:grid-cols-2 gap-6">
            {post.recommendedPosts.map((post) => (
              <PostItem key={post!.id} {...post!} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
