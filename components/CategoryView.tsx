import { Category } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryView() {
  // categoryを保持するState。
  const [categories, setCategories] = useState<Category[]>([]);
  // api/category/よりcategoryを受け取る。
  useEffect(() => {
    fetch("/api/category").then((res) => {
      res.json().then((json) => {
        setCategories(json.categories);
      });
    });
  }, []);

  return (
    <ul>
      {categories.map((category) => {
        return (
          <li key={category.id} className="text-left p-1 pl-5">
            <Link href={"/categories/" + category.id}>{category.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
