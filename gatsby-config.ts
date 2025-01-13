import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: "itsrakesh - Rakesh Potnuru",
    description:
      "I'm Rakesh - a software engineer, tech enthusiast and product creator with expertise in building innovative tools and products.",
    siteUrl: "https://itsrakesh.com",
    feedUrl: "https://itsrakesh.com/rss.xml",
    twitterUsername: "@rakesh_at_tweet",
    image: "/og.png",
    author: "Rakesh Potnuru",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GA_MEASUREMENT_ID, // Google Analytics / GA
        ],
        gtagConfig: {
          // optimize_id: "OPT_CONTAINER_ID",
          // anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: `gatsby-transformer-cloudinary`,
      options: {
        transformTypes: [
          {
            type: "contentfulBlogPostCoverJsonNode",
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                feed_url: feedUrl
                author
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allContentfulBlogPost },
            }: {
              query: {
                site: { siteMetadata: { siteUrl: string } };
                allContentfulBlogPost: { nodes: Queries.ContentfulBlogPost[] };
              };
            }) => {
              return allContentfulBlogPost.nodes.map((node) => {
                return {
                  title: node.title,
                  description: node.description,
                  date: node.publishedAt,
                  url: site.siteMetadata.siteUrl + `/${node.slug}`,
                  guid: site.siteMetadata.siteUrl + `/${node.slug}`,
                  categories: node.tags,
                };
              });
            },
            query: `
              {
                allContentfulBlogPost(
                  sort: { fields: [publishedAt], order: DESC }
                ) {
                  nodes {
                    title
                    slug
                    publishedAt
                    description
                    tags
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Rakesh's Blog",
            match: "^/blog/",
          },
        ],
      },
    },
  ],
  trailingSlash: "ignore",
};

export default config;
