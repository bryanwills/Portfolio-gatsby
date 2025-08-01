import { Link } from "gatsby";
import React from "react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import { Card, CardContent, CardHeader } from "@/components/ui/reusables/card";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

export default function ExploreTools() {
  return (
    <div className="space-y-16">
      <Row className="justify-between">
        <Heading level={2}>Explore Tools</Heading>
        <Link to={siteConfig.pages.tools.link}>
          <Button>View All</Button>
        </Link>
      </Row>
      <div className="gap-10 grid md:grid-cols-2">
        {Object.values(siteConfig.pages.tools.pages)
          .splice(0, 2)
          .map((page) => (
            <Link to={page.link} key={page.title}>
              <Card className="hover:opacity-80">
                <CardHeader className="bg-primary py-6 rounded-t-lg">
                  <img
                    src={page.image}
                    alt={page.title}
                    className="rounded-lg object-cover mx-auto w-full h-full"
                  />
                </CardHeader>
                <CardContent className="pt-4">
                  <Heading level={6}>{page.title}</Heading>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {page.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
