import { BLOCKS, INLINES, Node } from "@contentful/rich-text-types";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";

import { Icons } from "@/assets/icons";
import Col from "@/components/ui/col";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/reusables/badge";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";

export default function Body({
  contentfulProject,
}: Queries.ProjectBySlugQueryQuery) {
  const { title, url, techStack, body } = contentfulProject!;

  return (
    <Col className="items-start space-y-8">
      <Row className="justify-between w-full flex-col md:flex-row gap-4">
        <Heading level={1}>{title}</Heading>
        <a href={url!} target="_blank" className="w-full md:w-auto" rel="noreferrer">
          <Button variant={"secondary"} className="w-full">
            <Icons.ExternalLink /> Visit
          </Button>
        </a>
      </Row>
      {techStack?.length && (
        <Row className="flex-wrap gap-2 text-muted-foreground">
          Tech Stack:
          {techStack.map((item) => (
            <Badge key={item?.id} variant={"secondary"} className="text-sm">
              <GatsbyImage
                image={item?.icon?.gatsbyImageData as IGatsbyImageData}
                alt={item?.title!}
                className="w-4 h-4 rounded-[3px] mr-1"
              />
              {item?.title}
            </Badge>
          ))}
        </Row>
      )}
      <div className="space-y-2">
        {body?.raw && renderRichText(body, options)}
      </div>
    </Col>
  );
}

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node: Node, children: React.ReactNode) => (
      <Heading level={2}>{children}</Heading>
    ),
    [BLOCKS.HEADING_2]: (_node: Node, children: React.ReactNode) => (
      <Heading level={2}>{children}</Heading>
    ),
    [BLOCKS.HEADING_3]: (_node: Node, children: React.ReactNode) => (
      <Heading level={3}>{children}</Heading>
    ),
    [BLOCKS.HEADING_4]: (_node: Node, children: React.ReactNode) => (
      <Heading level={4}>{children}</Heading>
    ),
    [BLOCKS.HEADING_5]: (_node: Node, children: React.ReactNode) => (
      <Heading level={5}>{children}</Heading>
    ),
    [BLOCKS.HEADING_6]: (_node: Node, children: React.ReactNode) => (
      <Heading level={6}>{children}</Heading>
    ),
    [BLOCKS.PARAGRAPH]: (_node: Node, children: React.ReactNode) => (
      <p className="pb-4">{children}</p>
    ),
    [BLOCKS.OL_LIST]: (_node: Node, children: React.ReactNode) => (
      <ol className="list-decimal space-y-1 pl-4">{children}</ol>
    ),
    [BLOCKS.UL_LIST]: (_node: Node, children: React.ReactNode) => (
      <ol className="list-decimal space-y-1 pl-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: Node, children: React.ReactNode) => (
      <li>{children}</li>
    ),
    [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => {
      const { uri } = node.data;
      return (
        <a
          href={uri}
          className="underline text-primary hover:underline-offset-2"
          target="_blank" rel="noreferrer"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
      const { gatsbyImage, description } = node.data.target;
      return (
        <GatsbyImage
          image={getImage(gatsbyImage) as IGatsbyImageData}
          alt={description}
        />
      );
    },
  },
};
