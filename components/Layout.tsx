// すべてのページの枠組み。
// ヘッダーとかサイドバーとかフッターとかを組み込む。

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import SideBar from "./SideBar";

const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <div className="flex justify-around container mx-auto flex-wrap xl:max-w-screen-xl">
        <section className="w-5/6 lg:w-8/12">{children}</section>
        <section className="w-5/6 lg:w-3/12">
          <SideBar />
        </section>
      </div>
    </div>
  );
}
