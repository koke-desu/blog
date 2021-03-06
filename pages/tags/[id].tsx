import Layout from "../../components/Layout";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  getTags,
  getAllPosts,
  getCategories,
} from "../../firebase/dbFunctions";
import PostList from "../../components/PostList";
import { Post, Tag, Category, Tags } from "../../firebase/firebase";

export default function PostView(props) {
  const posts = JSON.parse(props.posts);
  const categories: Category[] = JSON.parse(props.categories);
  const tags: Tags[] = JSON.parse(props.tags);

  return (
    <Layout categories={categories} tags={tags}>
      <Head>
        <title>{props.tag}</title>
      </Head>
      <PostList posts={posts} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const Tags = await getTags();
  const children: Tag[] = [];
  Tags.map((tags) => {
    tags.children.map((tag) => {
      children.push(tag);
    });
  });

  const paths = children.map((tag) => {
    return { params: { id: tag.id } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      tag: params.id,
      posts: JSON.stringify(
        await getAllPosts("tag", "array-contains", params.id, 1)
      ),
      categories: JSON.stringify(await getCategories()),
      tags: JSON.stringify(await getTags()),
    },
  };
};
