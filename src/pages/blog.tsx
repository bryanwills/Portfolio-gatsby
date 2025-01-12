import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import PostsList from "@/components/modules/blog/posts-list";
import { siteConfig } from "@/config/site";

export default function BlogPage({
  location,
  data,
}: PageProps<Queries.BlogPageQuery>) {
  return (
    <Layout location={location}>
      <PostsList nodes={data.allContentfulBlogPost.nodes} />
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.blog.title}
      description={siteConfig.pages.blog.description}
      pathname={siteConfig.pages.blog.link}
    />
  );
}

export const pageQuery = graphql`
  query BlogPage {
    allContentfulBlogPost(sort: [{ publishedAt: DESC }]) {
      nodes {
        id
        slug
        title
        cover {
          gatsbyImageData(placeholder: BLURRED)
        }
        isFeatured
        excerpt
        tags
        publishedAt
      }
    }
  }
`;
