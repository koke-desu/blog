import Head from "next/head";
import Layout, { siteTitle } from "../../components/Layout";
import PostList from "../../components/PostList";
import { GetStaticProps, GetStaticPaths } from "next";
import firebase from "firebase";
import {
  getAllPosts,
  page_posts,
  getCategories,
  getTags,
} from "../../firebase/dbFunctions";
import { useState } from "react";
import admin from "firebase-admin";
import { Post, Category, Tags } from "../../firebase/firebase";

export default function Home(props) {
  const posts: Post[] = JSON.parse(props.posts);
  const categories: Category[] = JSON.parse(props.categories);
  const tags: Tags[] = JSON.parse(props.tags);

  return (
    <Layout categories={categories} tags={tags}>
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
      categories: JSON.stringify(await getCategories()),
      tags: JSON.stringify(await getTags()),
    },
  };
};
