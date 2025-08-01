import { PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import BackgroundRemover from "@/components/modules/tools/bg-remover";
import ToolLayout from "@/components/modules/tools/layout";
import { siteConfig } from "@/config/site";

export default function BackgroundRemoverPage({ location }: PageProps) {
  return (
    <Layout location={location}>
      <ToolLayout
        heading={siteConfig.pages.tools.pages.backgroundRemover.title}
        description={
          <span>
            Remove background from images for free. No signup. Completely in
            browser. <br /> Simple. Fast. Private.
          </span>
        }
      >
        <BackgroundRemover />
      </ToolLayout>
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.tools.pages.backgroundRemover.title}
      description={siteConfig.pages.tools.pages.backgroundRemover.description}
      pathname={siteConfig.pages.tools.pages.backgroundRemover.link}
      image={siteConfig.pages.tools.pages.backgroundRemover.image}
    />
  );
}
