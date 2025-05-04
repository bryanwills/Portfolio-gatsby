import { CreatePagesArgs, CreateWebpackConfigArgs } from "gatsby";
import * as path from "path";

export const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/common": path.resolve(__dirname, "src/common"),
        "@/utils": path.resolve(__dirname, "src/utils"),
        "@/config": path.resolve(__dirname, "src/config"),
        "@/assets": path.resolve(__dirname, "src/assets"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
      },
    },
  });
};

exports.createPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const { createPage } = actions;

  const projectResult = await graphql<{
    allContentfulProject: { nodes: { slug: string }[] };
  }>(`
    query Projects {
      allContentfulProject {
        nodes {
          slug
        }
      }
    }
  `);

  if (projectResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful projects`,
      projectResult.errors
    );
    return;
  }

  const projects = projectResult.data?.allContentfulProject.nodes;

  if (projects?.length) {
    projects.forEach((project) => {
      createPage({
        path: `/projects/${project.slug}`,
        component: path.resolve("./src/templates/project.tsx"),
        context: {
          slug: project.slug,
        },
      });
    });
  }

  const blogResult = await graphql<{
    allContentfulBlogPost: { nodes: { slug: string }[] };
  }>(`
    query BlogPosts {
      allContentfulBlogPost {
        nodes {
          slug
        }
      }
    }
  `);

  if (blogResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful blog posts`,
      blogResult.errors
    );
    return;
  }

  const blogPosts = blogResult.data?.allContentfulBlogPost.nodes;

  if (blogPosts?.length) {
    blogPosts.forEach((post) => {
      createPage({
        path: `/blog/${post.slug}`,
        component: path.resolve("./src/templates/post.tsx"),
        context: {
          slug: post.slug,
        },
      });
    });
  }

  const seriesResult = await graphql<{
    allContentfulBlogSeries: { nodes: { slug: string }[] };
  }>(`
    query BlogSeries {
      allContentfulBlogSeries {
        nodes {
          slug
        }
      }
    }
  `);

  if (seriesResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful blog series`,
      seriesResult.errors
    );
    return;
  }

  const series = seriesResult.data?.allContentfulBlogSeries.nodes;

  if (series?.length) {
    series.forEach((series) => {
      createPage({
        path: `/blog/series/${series.slug}`,
        component: path.resolve("./src/templates/series.tsx"),
        context: {
          slug: series.slug,
        },
      });
    });
  }

  const snippetsResult = await graphql<{
    allContentfulSnippet: { nodes: { slug: string }[] };
  }>(`
    query Snippets {
      allContentfulSnippet {
        nodes {
          slug
        }
      }
    }
  `);

  if (snippetsResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful snippets`,
      snippetsResult.errors
    );
    return;
  }

  const snippets = snippetsResult.data?.allContentfulSnippet.nodes;

  if (snippets?.length) {
    snippets.forEach((snippets) => {
      createPage({
        path: `/snippets/${snippets.slug}`,
        component: path.resolve("./src/templates/snippet.tsx"),
        context: {
          slug: snippets.slug,
        },
      });
    });
  }
};
