import { PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import ImageResizerCropper from "@/components/modules/tools/image-resizer-cropper";
import ToolLayout from "@/components/modules/tools/layout";
import { siteConfig } from "@/config/site";

export default function ImageResizerCropperPage({ location }: PageProps) {
  return (
    <Layout location={location}>
      <ToolLayout
        heading={siteConfig.pages.tools.pages.imageResizerCropper.title}
        description={
          <span>
            Resize and crop your images effortlessly. <br /> Simple. Private.
          </span>
        }
      >
        <ImageResizerCropper />
      </ToolLayout>
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.tools.pages.imageResizerCropper.title}
      description={siteConfig.pages.tools.pages.imageResizerCropper.description}
      pathname={siteConfig.pages.tools.pages.imageResizerCropper.link}
      image={siteConfig.pages.tools.pages.imageResizerCropper.image}
    />
  );
}
