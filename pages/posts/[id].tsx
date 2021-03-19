import Layout from "../../components/Layout";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  getPost,
  getAllPosts,
  getCategories,
  getTags,
} from "../../firebase/dbFunctions";
import PostSingle from "../../components/PostSingle";
import { Post, Category, Tags } from "../../firebase/firebase";

export default function PostView(props) {
  const post = JSON.parse(props.post);
  const categories: Category[] = JSON.parse(props.categories);
  const tags: Tags[] = JSON.parse(props.tags);

  return (
    <Layout categories={categories} tags={tags}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <PostSingle post={post} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => {
    return { params: { id: post.id } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      post: JSON.stringify(await getPost(params.id as string)),
      categories: JSON.stringify(await getCategories()),
      tags: JSON.stringify(await getTags()),
    },
  };
};
