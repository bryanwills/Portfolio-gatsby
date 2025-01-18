import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";

import { siteConfig } from "@/config/site";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function generateToc(markdown: string): TocItem[] {
  const toc: TocItem[] = [];

  const processor = remark().use(remarkHtml);

  processor.parse(markdown).children.forEach((node: any) => {
    if (node.type === "heading") {
      const id = node.children[0].value.toLowerCase().replace(/\s+/g, "-");
      toc.push({
        id,
        text: node.children[0].value,
        level: node.depth,
      });
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
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    setToc(generateToc(content));
  }, [content]);

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
          {toc.map((item) => (
            <li
              key={item.id}
              style={{ marginLeft: `${(item.level - 1) * 10}px` }}
              className="py-1"
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
