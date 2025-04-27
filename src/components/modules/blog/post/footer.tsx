import Giscus from "@giscus/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { toast } from "sonner";

import { Icons } from "@/assets/icons";
import { PostItem } from "@/components/modules/blog/post/post-item";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/reusables/dialog";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

export default function Footer({
  post,
}: {
  post: Queries.PostBySlugQuery["contentfulBlogPost"];
}) {
  return (
    <div className="not-prose space-y-16">
      <Row className="justify-between rounded-xl bg-chart-6 p-8 text-black flex-col md:flex-row gap-4">
        <p className="font-bold">Loved this post?</p>
        <Row className="gap-2">
          <a href={siteConfig.links.donate} target="_blank" rel="noreferrer">
            <Button variant={"secondary"}>🍕 Buy me a pizza</Button>
          </a>
          <DonateViaUPI />
        </Row>
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

function DonateViaUPI() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          Donate via{" "}
          <StaticImage
            src="../../../../images/upi-logo.svg"
            alt="UPI"
            className="rounded-lg"
            width={40}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <StaticImage
          src="../../../../images/upi.png"
          alt={siteConfig.links.upi}
          className="rounded-lg"
        />
        <Button
          onClick={() => {
            navigator.clipboard
              .writeText(siteConfig.links.upi)
              .then(() => toast.success("UPI ID copied to clipboard"));
          }}
          variant={"outline"}
          className="w-max rounded-full absolute bottom-2 sm:bottom-4 right-0 left-0 m-auto"
        >
          {siteConfig.links.upi}
          <Icons.Copy />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
