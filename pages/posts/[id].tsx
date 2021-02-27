import Layout from "../../components/Layout";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { getPost, getAllPosts } from "../../firebase/dbFunctions";
import PostSingle from "../../components/PostSingle";
import { Post } from "../../firebase/firebase";

export default function PostView(props) {
  const post = JSON.parse(props.post);

  return (
    <Layout>
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
    },
  };
};
