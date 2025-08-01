import { PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import ColorPaletteExtractor from "@/components/modules/tools/color-palette-extractor";
import ToolLayout from "@/components/modules/tools/layout";
import { siteConfig } from "@/config/site";

export default function ColorPaletteExtractorPage({ location }: PageProps) {
  return (
    <Layout location={location}>
      <ToolLayout
        heading={siteConfig.pages.tools.pages.colorPaletteExtractor.title}
        description={
          <span>
            Extract color palettes from images and generate color schemes for
            your projects. <br /> Simple. Fast. Private.
          </span>
        }
      >
        <ColorPaletteExtractor />
      </ToolLayout>
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={"Color Palette Extractor from Image - Fast & Free Tool"}
      description={
        siteConfig.pages.tools.pages.colorPaletteExtractor.description
      }
      pathname={siteConfig.pages.tools.pages.colorPaletteExtractor.link}
      image={siteConfig.pages.tools.pages.colorPaletteExtractor.image}
    />
  );
}
