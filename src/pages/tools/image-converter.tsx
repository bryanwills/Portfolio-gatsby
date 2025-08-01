import { PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import ImageConverter from "@/components/modules/tools/image-converter";
import ToolLayout from "@/components/modules/tools/layout";
import { siteConfig } from "@/config/site";

export default function ImageConverterPage({ location }: PageProps) {
  return (
    <Layout location={location}>
      <ToolLayout
        heading={siteConfig.pages.tools.pages.imageConverter.title}
        description={
          <span>
            Convert JPG, PNG, BMP, TIFF, WebP, AVIF, HEIC from one format to
            another. <br /> Simple. Fast. Private
          </span>
        }
      >
        <ImageConverter />
      </ToolLayout>
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={"Free Online Image Converter - JPG, PNG, WebP, AVIF & More"}
      description={siteConfig.pages.tools.pages.imageConverter.description}
      pathname={siteConfig.pages.tools.pages.imageConverter.link}
      image={siteConfig.pages.tools.pages.imageConverter.image}
    />
  );
}
