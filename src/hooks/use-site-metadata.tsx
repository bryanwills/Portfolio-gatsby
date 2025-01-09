import { graphql, useStaticQuery } from "gatsby";

export interface SiteMetadata {
  title: string;
  description: string;
  twitterUsername: string;
  image: string;
  siteUrl: string;
}

export function useSiteMetadata(): SiteMetadata {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          image
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
}
