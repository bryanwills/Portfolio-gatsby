import { format } from "date-fns";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import React from "react";
import { readingTime } from "reading-time-estimator";

import Col from "@/components/ui/col";
import { Heading } from "@/components/ui/heading";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

export default function Header({
  post,
}: {
  post: Queries.PostBySlugQuery["contentfulBlogPost"];
}) {
  if (!post) {
    return <div>No post available</div>;
  }
  const { cover, title, updatedAt, publishedAt, body } = post;

  const readTime = readingTime(body?.body!);

  return (
    <Col className="space-y-8 items-start">
      <GatsbyImage
        image={cover?.[0]?.gatsbyImageData!}
        alt={title!}
        className="rounded-xl"
      />
      <Row className="gap-4">
        <StaticImage
          src="../../../../images/avatar.png"
          alt="Rakesh Potnuru"
          placeholder="blurred"
          width={50}
          height={50}
          className="rounded-full bg-primary/90 not-prose"
        />
        <Col className="items-start">
          <span>
            <span className="text-sm italic">written by</span>{" "}
            {siteConfig.author}
          </span>
          <span className="text-muted-foreground text-sm">
            <time dateTime={publishedAt!}>
              {format(new Date(publishedAt!), "MMM d, yyyy")} ・{" "}
            </time>
            {readTime.text}
            {new Date(updatedAt!).toDateString() !==
              new Date(publishedAt!).toDateString() && (
              <time dateTime={updatedAt!}>
                {" "}
                ・ Updated {format(new Date(updatedAt!), "MMM d, yyyy")}
              </time>
            )}
          </span>
        </Col>
      </Row>
      <Heading level={1} className="text-foreground leading-tight">
        {title}
      </Heading>
    </Col>
  );
}
