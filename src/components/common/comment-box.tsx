import Giscus from "@giscus/react";
import React from "react";

import { Heading } from "../ui/heading";

export default function CommentBox() {
  return (
    <>
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
    </>
  );
}
