"use client"
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import { useState, useEffect } from "react";

const SinglePage = ({ params }) => {
  const { slug } = params;
  const [data, setData] = useState(null);
  const [searchComment, setSearchComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed");
        }

        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    setSearchComment(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input type="text" value={searchComment} onChange={handleChange} placeholder="Search Comment..." className={styles.input}/>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>{data?.createdAt?.substr(0, 10)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} searchComment={searchComment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;