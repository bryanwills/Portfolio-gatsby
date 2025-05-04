import React, { useState } from "react";

import { Icons } from "@/assets/icons";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/reusables/input";

import SnippetItem from "./snippet-item";

export default function SnippetsList({
  allContentfulSnippet: { nodes },
}: Queries.SnippetPageQuery) {
  const [snippets, setSnippets] =
    useState<Queries.SnippetPageQuery["allContentfulSnippet"]["nodes"]>(nodes);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredSnippets = nodes.filter(
      (snippet) =>
        snippet.title?.toLowerCase().includes(searchTerm) ||
        snippet.description?.toLowerCase().includes(searchTerm)
    );
    setSnippets(filteredSnippets);
  };

  return (
    <div className="space-y-16">
      <Heading level={1}>Snippets</Heading>
      <div className="relative">
        <Icons.Search className="absolute top-3 right-3 text-muted-foreground" />
        <Input onChange={handleSearch} placeholder="Search snippets..." />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map((snippet) => (
          <SnippetItem key={snippet.id} {...snippet} />
        ))}
      </div>
    </div>
  );
}
