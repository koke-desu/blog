import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import firebase from "firebase";
import { getPosts } from "../firebase/dbFunctions";
import { DB } from "../firebase/firebase";
import { useState } from "react";
import { Post } from "../firebase/firebase";

export default function Home(props: { posts: Post[] }) {
  console.log(props.posts);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      posts: getPosts,
    },
  };
};
