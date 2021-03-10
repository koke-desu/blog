import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import PostList from "../components/PostList";
import { GetStaticProps } from "next";
import firebase from "firebase";
import { getAllPosts, addPost, getImage } from "../firebase/dbFunctions";
import { useState } from "react";
import admin from "firebase-admin";
import { Post } from "../firebase/firebase";

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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: JSON.stringify(await getAllPosts()),
    },
  };
};
