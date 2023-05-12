"use client";

import { useState, useEffect } from "react";
import styles from "./blogPosts.module.scss";
import Image from "next/image";
import settings from "../settings";

const BlogPosts = (params) => {
  const [pageSize, setPageSize] = useState(settings.blogPagination);
  const [locale, setLocale] = useState(params.locale);
  const [blogPosts, setBlogPosts] = useState([]);
  const [translations, setTranslations] = useState(params.translations);
  const [loadedBlogPosts, setLoadedBlogPosts] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    async function getBlogsNextPage(locale, pageSize) {
      const res = await fetch(
        `${settings.backendUrl}/api/blog-posts?sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=${pageSize}&locale=${locale}&fields[0]=title&fields[1]=description&fields[2]=eventTime&populate[0]=categories&populate[1]=thumbnail&pagination[withCount]=true`,
        { next: { revalidate: settings.revalidateTime } }
      );
      const data = await res.json();
      setBlogPosts(data.data);
      setLoadedBlogPosts(true);
      if (data.meta.pagination.total === data.data.length) {
        setIsEnd(true);
      }
    }
    getBlogsNextPage(locale, pageSize);
  }, [pageSize, locale]);

  return (
    <div>
      {loadedBlogPosts ? (
        <div className={styles.container}>
          {blogPosts.map((post) => {
            return (
              <div key={post.id} className={styles.cardWrapper}>
                <div className={styles.card}>
                  <Image
                    alt={post.attributes.thumbnail.data.attributes.name}
                    src={
                      settings.backendUrl +
                      post.attributes.thumbnail.data.attributes.url
                    }
                    className={styles.image}
                    priority
                    width={300}
                    height={300}
                  ></Image>
                  <div className={styles.content}>
                    <h1 className={styles.title}>{post.attributes.title}</h1>
                    <p className={styles.desc}>{post.attributes.description}</p>
                    <a href="#" className={styles.action}>
                      {translations.more}
                      <span aria-hidden="true">→</span>
                    </a>
                    <div className={styles.tags}>
                      {post.attributes.categories.data.map((category) => {
                        return (
                          <div key={category.id}>
                            <a href="#" className={styles.tag}>
                              #{category.attributes.name.replace(/\s/g, "")}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {!isEnd && (
            <a
              className={styles.action}
              style={{ height: "30px", alignSelf: "center" }}
              onClick={() => {
                setPageSize(pageSize + settings.blogPagination);
              }}
            >
              {translations.load}
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default BlogPosts;
