import Link from "next/link";
import { Post } from "../firebase/firebase";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import "github-markdown-css";

export default function PostSingle({ post }: { post: Post }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown plugins={[[gfm]]}>{post.body}</ReactMarkdown>
    </div>
  );
}
