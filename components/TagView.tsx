import { Tag, Tags } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TagView() {
  // tagを保持するState。
  const [tags, setTags] = useState<Tags[]>([]);
  // api/tag/よりtagsを受け取る。
  useEffect(() => {
    fetch("http://localhost:3000/api/tag").then((res) => {
      res.json().then((json) => {
        console.log(json.tags);
        setTags(json.tags);
      });
    });
  }, []);

  return (
    <div>
      {tags.map((tags) => {
        return (
          <div key={tags.id}>
            <p className="text-left font-bold p-1 ml-5">{tags.name}</p>
            <ul className=" list-disc text-left ml-10">
              {tags.children.map((tag) => {
                return (
                  <li key={tag.id} className="">
                    <Link href={"/tags/" + tag.id}>{tag.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
