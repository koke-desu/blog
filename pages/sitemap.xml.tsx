import { GetServerSidePropsContext } from "next";
import { getAllPosts } from "../firebase/dbFunctions";

// xの先頭に0を必要数挿入しn桁の文字列にする。
const zeros = (x: number, n: number): string => {
  return x.toString().padStart(n, "0");
};

async function generateSitemapXml() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // ここでurlを足していく
  const posts = await getAllPosts();
  posts.forEach((post) => {
    if (post.public) {
      xml += `
      <url>
        <loc>https://koke-tech-blog.vercel.app/posts/${post.id}</loc>
        <lastmod>${post.updateTime.getFullYear()}-${zeros(
        post.updateTime.getMonth() + 1,
        2
      )}-${zeros(post.updateTime.getDate(), 2)}</lastmod>
      </url>
    `;
    }
  });

  xml += `</urlset>`;
  return xml;
}

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml(); // xmlコードを生成する処理（後で書く）

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24時間のキャッシュ
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
