import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import PostList from "../components/PostList";
import { GetStaticProps } from "next";
import firebase from "firebase";
import { getAllPosts, getCategories, getTags } from "../firebase/dbFunctions";
import { useState } from "react";
import admin from "firebase-admin";
import { Post, Category, Tags } from "../firebase/firebase";

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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: JSON.stringify(await getAllPosts()),
      categories: JSON.stringify(await getCategories()),
      tags: JSON.stringify(await getTags()),
    },
  };
};
