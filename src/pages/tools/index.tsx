import { Link, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardHeader } from "@/components/ui/reusables/card";
import { siteConfig } from "@/config/site";

export default function ToolsPage({ location }: PageProps) {
  return (
    <Layout location={location} className="space-y-16">
      <div className="space-y-6">
        <Heading level={1}>Tools</Heading>
        <p className="text-muted-foreground">
          {siteConfig.pages.tools.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(siteConfig.pages.tools.pages).map((page) => (
          <Link to={page.link} key={page.title}>
            <Card className="hover:opacity-80">
              <CardHeader className="bg-primary py-6 rounded-t-lg">
                <img
                  src={page.image}
                  alt={page.title}
                  className="rounded-lg object-cover mx-auto w-full h-48"
                />
              </CardHeader>
              <CardContent className="pt-4">
                <Heading level={3}>{page.title}</Heading>
                <p className="text-muted-foreground mt-2">{page.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.tools.title}
      description={siteConfig.pages.tools.description}
      pathname={siteConfig.pages.tools.link}
    />
  );
}
