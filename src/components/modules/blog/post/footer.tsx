import React from "react";

import CommentBox from "@/components/common/comment-box";
import DonationBox from "@/components/common/donation-box";
import { PostItem } from "@/components/modules/blog/post/post-item";
import { Heading } from "@/components/ui/heading";

export default function Footer({
  post,
}: {
  post: Queries.PostBySlugQuery["contentfulBlogPost"];
}) {
  return (
    <div className="not-prose space-y-16">
      <DonationBox />
      <CommentBox />
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
