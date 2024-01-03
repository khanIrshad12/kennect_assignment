'use client'
import { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import SearchInput from "../SearchInput/SearchInput";

const getData = async (page, searchQuery) => {
  const url = new URL(`/api/posts`);
  const params = { page };

  if (searchQuery) {
    params.search = searchQuery;
  }

  url.search = new URLSearchParams(params);

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = ({ page }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState({ posts: [], count: 0 });
console.log("search",searchQuery,"set data",data.count)
  const onSearchChange = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(page,searchQuery);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, searchQuery]);

  const filteredPosts = data.posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const POST_PER_PAGE = 4;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count;
  return (
    <div className="">
      <div className={styles.search}>
        <SearchInput onSearchChange={onSearchChange} />
      </div>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {filteredPosts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      {filteredPosts.length === 0 && <p>No matching blog posts found.</p>}
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};
export default CardList;