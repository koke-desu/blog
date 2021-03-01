import { Category } from "../firebase/firebase";
import { useEffect, useState } from "react";

export default function CategoryView() {
  // categoryを保持するState。
  const [categories, setCategories] = useState<Category[]>([]);
  // api/category/よりcategoryを受け取る。
  useEffect(() => {
    fetch("http://localhost:3000/api/category").then((res) => {
      res.json().then((json) => {
        console.log(json.categories);
        setCategories(json.categories);
      });
    });
  }, []);
  return (
    <ul>
      {categories.map((category) => {
        return <li key={category.id}>{category.name}</li>;
      })}
    </ul>
  );
}
