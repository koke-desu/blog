import Head from "next/head";
import Layout, { siteTitle } from "../../components/Layout";
import PostList from "../../components/PostList";
import { GetStaticProps, GetStaticPaths } from "next";
import firebase from "firebase";
import {
  getAllPosts,
  addPost,
  getImage,
  page_posts,
} from "../../firebase/dbFunctions";
import { useState } from "react";
import admin from "firebase-admin";
import { Post } from "../../firebase/firebase";

export default function Home(props) {
  const posts: Post[] = JSON.parse(props.posts);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <PostList posts={posts} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const arr = [];
  for (let i = 1; i <= Math.ceil(posts.length / page_posts); i++) arr.push(i);
  console.log(arr);
  const paths = arr.map((id) => {
    return { params: { page: id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      posts: JSON.stringify(
        await getAllPosts("createTime", "!=", "", Number(params.page))
      ),
    },
  };
};
