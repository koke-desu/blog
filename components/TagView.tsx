import { Tag, Tags } from "../firebase/firebase";
import { useEffect, useState } from "react";

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
            <p>{tags.name}</p>
            <ul>
              {tags.children.map((tag) => {
                return <li key={tag.id}>{tag.name}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
