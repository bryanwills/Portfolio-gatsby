import { format } from "date-fns";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import Col from "@/components/ui/col";
import { Heading } from "@/components/ui/heading";
import { AspectRatio } from "@/components/ui/reusables/aspect-ratio";
import { Badge } from "@/components/ui/reusables/badge";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";
import { shortenText } from "@/utils/shorten-text";

export default function LatestBlogPosts({
  nodes,
}: Readonly<Queries.HomePageQuery["allContentfulBlogPost"]>) {
  return (
    <div className="space-y-16">
      <Row className="justify-between">
        <Heading level={2}>Latest Blog Posts</Heading>
        <Link to={siteConfig.pages.blog.link}>
          <Button>View More</Button>
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

export function PostItem({
  title,
  cover,
  excerpt,
  tags,
  slug,
  isFeatured,
  publishedAt,
}: Pick<
  Queries.BlogPageQuery["allContentfulBlogPost"]["nodes"][number],
  "excerpt" | "cover" | "slug" | "tags" | "title" | "isFeatured" | "publishedAt"
>) {
  return (
    <Link to={`${siteConfig.pages.blog.link}/${slug}`}>
      <Col className="rounded-xl border hover:opacity-80">
        <AspectRatio ratio={16 / 9} className="relative">
          <GatsbyImage
            image={cover?.[0]?.gatsbyImageData!}
            alt={title!}
            className="rounded-t-xl h-full w-full object-cover"
          />
          {isFeatured && (
            <Badge className="uppercase absolute right-2 top-2 bg-gradient-to-l from-[#7928CA] to-[#FF0080]">
              Featured
            </Badge>
          )}
        </AspectRatio>
        <Col className="space-y-2 p-4 items-start">
          <Heading level={6}>{title}</Heading>
          <p className="text-sm text-muted-foreground">
            {shortenText(excerpt!, 160)}
          </p>
          <Row className="justify-between w-full">
            <div className="flex flex-wrap gap-2">
              {tags!.slice(0, 2).map((tag) => (
                <Badge key={tag} variant={"secondary"} className="uppercase">
                  #{tag}
                </Badge>
              ))}
            </div>
            <time
              dateTime={publishedAt!}
              className="text-sm text-muted-foreground"
            >
              {format(new Date(publishedAt!), "MMM d, yyyy")}
            </time>
          </Row>
        </Col>
      </Col>
    </Link>
  );
}
