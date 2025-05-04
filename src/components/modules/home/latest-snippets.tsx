import { Link } from "gatsby";
import React from "react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

import SnippetItem from "../snippets/snippet-item";

export default function LatestSnippets({
  nodes,
}: Readonly<Queries.HomePageQuery["allContentfulSnippet"]>) {
  return (
    <div className="space-y-16">
      <Row className="justify-between">
        <Heading level={2}>Latest Snippets</Heading>
        <Link to={siteConfig.pages.snippets.link}>
          <Button>View All</Button>
        </Link>
      </Row>
      <div className="gap-10 grid md:grid-cols-3">
        {nodes.map((snippet) => (
          <SnippetItem key={snippet.id} {...snippet} />
        ))}
      </div>
    </div>
  );
}
