import { Link } from "gatsby";
import React from "react";

import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/reusables/badge";
import { siteConfig } from "@/config/site";

export default function SnippetItem({
  id,
  slug,
  description,
  tags,
  title,
}: Pick<
  Queries.SnippetPageQuery["allContentfulSnippet"]["nodes"][number],
  "title" | "description" | "tags" | "id" | "slug"
>) {
  return (
    <Link
      to={`${siteConfig.pages.snippets.link}/${slug}`}
      key={id}
      className="border rounded-xl p-4 hover:opacity-80"
    >
      <Heading level={6}>{title}</Heading>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags!.slice(0, 3).map((tag) => (
          <Badge key={tag} variant={"secondary"} className="uppercase">
            #{tag}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
