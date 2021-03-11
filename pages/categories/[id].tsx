import Layout from "../../components/Layout";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  getCategories,
  getAllPosts,
  getTags,
} from "../../firebase/dbFunctions";
import PostList from "../../components/PostList";
import { Post, Category, Tags } from "../../firebase/firebase";

export default function PostView(props) {
  const posts = JSON.parse(props.posts);
  const categories: Category[] = JSON.parse(props.categories);
  const tags: Tags[] = JSON.parse(props.tags);

  return (
    <Layout categories={categories} tags={tags}>
      <Head>
        <title>{props.category}</title>
      </Head>
      <PostList posts={posts} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories.map((category) => {
    return { params: { id: category.id } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      category: params.id,
      posts: JSON.stringify(await getAllPosts("category", "==", params.id, 1)),
      categories: JSON.stringify(await getCategories()),
      tags: JSON.stringify(await getTags()),
    },
  };
};
