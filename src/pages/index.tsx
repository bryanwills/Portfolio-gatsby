import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import Hero from "@/components/modules/home/hero";
import PastClients from "@/components/modules/home/past-clients";
import RecentProjects from "@/components/modules/home/recent-projects";
import WhyHireMe from "@/components/modules/home/why-hire-me";

export default function HomePage({
  location,
  data,
}: Readonly<PageProps<Queries.HomePageQuery>>) {
  return (
    <Layout location={location} className="space-y-20">
      <Hero />
      <PastClients pastClients={data.allContentfulClient} />
      <RecentProjects projects={data.allContentfulProject} />
      <WhyHireMe />
    </Layout>
  );
}

export function Head() {
  return <Seo />;
}

export const pageQuery = graphql`
  query HomePage {
    allContentfulClient {
      nodes {
        id
        name
        logo {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
    allContentfulProject(limit: 2, sort: { launchedAt: DESC }) {
      nodes {
        id
        slug
        title
        images {
          gatsbyImageData(placeholder: BLURRED)
        }
        url
      }
    }
  }
`;
