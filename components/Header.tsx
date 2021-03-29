import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-main1">
      <h1 className="text-5xl flex justify-center text-white p-2">
        <Link href="/">koke TechBlog</Link>
      </h1>
      <h2 className="text-2xl flex justify-center text-white p-2">
        主にフロントエンド関係で学んだことを書いていきます。
      </h2>
    </div>
  );
}
