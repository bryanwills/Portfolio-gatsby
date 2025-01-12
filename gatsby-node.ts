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
    query ProjectPages {
      allContentfulProject {
        nodes {
          slug
        }
      }
    }
  `);

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

  if (projectResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful projects`,
      projectResult.errors
    );
    return;
  }

  if (blogResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful blog posts`,
      blogResult.errors
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
};
