import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import firebase from "firebase";
import { getPosts, addPost } from "../firebase/dbFunctions";
import { useState } from "react";
import { Post } from "../firebase/firebase";

export default function Home() {
  // console.log(props);
  // const posts: Post[] = JSON.parse(props.posts);
  // console.log(posts);
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section></section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const firebaseConfig = {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.FIREBASE_DATABASE_URL,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.FIREBASE_APP_ID,
  //   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  // };
  // try {
  //   firebase.initializeApp(firebaseConfig);
  // } catch (error) {
  //   //console.log(error);
  // }
  const admin = require("firebase-admin");
  const ServiceAccount = require("../firebase/serviceAccountKey.json");
  try {
    admin.initializeApp({
      credential: admin.credential.cert(ServiceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  } catch (error) {
    console.log(error);
  }

  const DB: firebase.firestore.Firestore = admin.firestore();
  return {
    props: {
      posts: JSON.stringify(
        await getPosts(DB).then((res) => {
          return res;
        })
      ),
    },
  };
};
