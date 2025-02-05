import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { Root } from "remark-html/lib";

import { siteConfig } from "@/config/site";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractTextFromPhrasingContent(
  node: Root["children"][number]
): string {
  if ("value" in node) {
    return node.value;
  }
  if ("children" in node) {
    return node.children
      .map((child: Root["children"][number]) =>
        extractTextFromPhrasingContent(child)
      )
      .join("");
  }
  return "";
}

function generateToc(markdown: string): TocItem[] {
  const toc: TocItem[] = [];
  const processor = remark().use(remarkHtml);

  const ast = processor.parse(markdown);

  ast.children.forEach((node: Root["children"][number]) => {
    if (node.type === "heading") {
      const headingNode = node;
      const text = headingNode.children
        .map((child: Root["children"][number]) =>
          extractTextFromPhrasingContent(child)
        )
        .join("");

      if (text) {
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        toc.push({
          id,
          text,
          level: headingNode.depth,
        });
      }
    }
  });

  return toc;
}

export default function Toc({
  content,
  href,
}: {
  content: string;
  href: string;
}) {
  return (
    <aside className="sticky top-4 flex flex-col gap-4 max-h-[calc(100vh-2rem)]">
      <a
        href={`${siteConfig.links.adLink}/?utm_source=blog&utm_medium=banner&utm_content=${href}`}
        target="_blank"
        className="flex-shrink-0"
        rel="noreferrer"
      >
        <StaticImage
          src="../../../../images/ad.png"
          alt="Publish Studio"
          width={300}
          height={250}
          className="rounded-xl"
        />
      </a>
      <div className="border rounded-xl flex flex-col min-h-0 p-4 gap-4">
        <h3 className="text-xl font-medium text-muted-foreground">
          Table of Contents
        </h3>
        <ol className="overflow-y-auto list-decimal list-inside space-y-2 marker:text-muted-foreground">
          {generateToc(content).map((item) => (
            <li
              key={item.id}
              style={{ marginLeft: `${(item.level - 1) * 10}px` }}
              className="py-1 font-medium"
            >
              <a
                href={`#${item.id}`}
                className="no-underline hover:text-primary transition-colors duration-200"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
