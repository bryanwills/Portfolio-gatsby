import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

import { Icons } from "@/assets/icons";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

export default function RecentProjects({
  projects,
}: Readonly<{
  projects: Queries.HomePageQuery["allContentfulProject"];
}>) {
  return (
    <div className="space-y-16">
      <Row className="justify-between">
        <Heading level={2}>Recent Projects</Heading>
        <Link to={siteConfig.pages.projects.link}>
          <Button>View More</Button>
        </Link>
      </Row>
      <Row className="gap-10 flex-col md:flex-row">
        {projects.nodes.map((project) => (
          <ProjectItem
            key={project.id}
            title={project.title ?? ""}
            slug={project.slug ?? ""}
            url={project.url ?? ""}
            image={project.images![0]?.gatsbyImageData as IGatsbyImageData}
          />
        ))}
      </Row>
    </div>
  );
}

interface ProjectItemProps {
  title: string;
  slug: string;
  url: string;
  image: IGatsbyImageData;
}

export function ProjectItem({
  title,
  image,
  slug,
  url,
}: Readonly<ProjectItemProps>) {
  return (
    <div className="border rounded-xl">
      <Link to={`${siteConfig.pages.projects.link}/${slug}`}>
        <GatsbyImage
          image={image}
          alt={title}
          className="rounded-t-xl hover:opacity-80"
        />
      </Link>
      <Heading level={4} className="p-2 px-4">
        {title}
      </Heading>
      <div className="grid grid-cols-2 divide-x border-t">
        <Link to={`${siteConfig.pages.projects.link}/${slug}`}>
          <Button
            variant={"ghost"}
            className="w-full rounded-none rounded-bl-xl"
          >
            <Icons.Read /> Learn More
          </Button>
        </Link>
        <a href={url} target="_blank" rel="noreferrer">
          <Button
            variant={"ghost"}
            className="w-full rounded-none rounded-br-xl"
          >
            <Icons.ExternalLink /> Visit
          </Button>
        </a>
      </div>
    </div>
  );
}
