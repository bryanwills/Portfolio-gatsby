import { CheckIcon, CopyIcon } from "lucide-react";
import React from "react";
import Markdown, { ExtraProps } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeSlug from "rehype-slug";

import { Button } from "@/components/ui/reusables/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/utils/cn";

export default function Body({ content }: { content: string }) {
  return (
    <Markdown
      components={{
        code: (props) => <Codeblock {...props} />,
      }}
      rehypePlugins={[rehypeSlug]}
    >
      {content}
    </Markdown>
  );
}

function Codeblock(
  props: React.ClassAttributes<HTMLElement> &
    React.HTMLAttributes<HTMLElement> &
    ExtraProps
) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000,
  });

  const { children, className, node, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");

  const language = match?.[1];
  const value = String(children).replace(/\n$/, "");

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
  };

  return match ? (
    <div className="relative">
      <div className="flex w-full items-center justify-between px-6 py-1 pr-4 bg-secondary rounded-b-none">
        <span className="text-xs lowercase">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-xs"
          onClick={onCopy}
        >
          {isCopied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      {/* @ts-ignore */}
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        children={value}
        language={language}
        style={theme}
        wrapLongLines
        showLineNumbers
        customStyle={{
          margin: 0,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        }}
        className="max-w-sm sm:max-w-full max-h-[30rem]"
      />
    </div>
  ) : (
    <code
      {...rest}
      className={cn(
        "bg-muted p-1.5 py-1 text-sm rounded-sm before:content-[''] after:content-[''] font-medium text-muted-foreground",
        className
      )}
    >
      {children}
    </code>
  );
}
