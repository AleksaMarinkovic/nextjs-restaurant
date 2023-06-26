"use client";

import { useState, useEffect } from "react";
import styles from "./blogPosts.module.scss";
import settings from "../settings";
import Card from "./card";
import FilterPosts from "./filterPosts";
import QueryString from "qs";
import LoadingSpinner from "../loadingSpinner";
import { useTranslations } from "next-intl";
import { Kaushan_Script } from "next/font/google";
import SearchPosts from "./searchPosts";

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const BlogPosts = (params) => {
  const t = useTranslations("Blog");
  const [filter, setFilter] = useState({
    pageSize: settings.blogPagination,
    locale: params.locale,
    type: "",
    title: "",
  });
  const [blogPosts, setBlogPosts] = useState([]);
  const [loadedBlogPosts, setLoadedBlogPosts] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    async function getBlogsNextPage(locale, pageSize) {
      const query = QueryString.stringify(
        {
          sort: ["updatedAt:desc"],
          pagination: {
            page: 1,
            pageSize: pageSize,
          },
          filters: {
            title: {
              $containsi: filter.title,
            },
            type: {
              type: {
                $contains: filter.type,
              },
            },
          },
          fields: ["title", "description", "eventTime"],
          locale: [locale],
          populate: ["categories", "thumbnail", "type"],
        },
        {
          encodeValuesOnly: true,
        }
      );
      const res = await fetch(
        `${settings.backendUrl}/api/blog-posts?${query}`,
        { next: { revalidate: settings.revalidateTime } }
      );
      const data = await res.json();
      if (data.data) {
        setBlogPosts(data.data);
        setLoadedBlogPosts(true);
      }
      if (data.meta.pagination.total === data.data.length) {
        setIsEnd(true);
      } else {
        setIsEnd(false);
      }
    }
    getBlogsNextPage(filter.locale, filter.pageSize);
  }, [filter]);

  const blogFilterHandler = (filter) => {
    setFilter((prevState) => ({
      ...prevState,
      ...filter,
    }));
  };

  return (
    <div className={styles.wrapper}>
      {loadedBlogPosts ? (
        <div style={{ width: "100%" }}>
          <div className={styles.blogPosts}>
            <h1 className={`${styles.header} ${kaushan.className}`}>
              {t("blog")}
            </h1>
            <div className={styles.filterAndSearch}>
              <FilterPosts
                filterHandler={blogFilterHandler}
                locale={filter.locale}
              ></FilterPosts>
              <SearchPosts
                filterHandler={blogFilterHandler}
                locale={filter.locale}
              ></SearchPosts>
            </div>

            {blogPosts.length > 0 ? (<div className={styles.container}>
              {blogPosts.map((post) => {
                return (
                  <Card key={post.id} locale={filter.locale} post={post}></Card>
                );
              })}
            </div>) :(<div className={`${styles.noItemsText} ${kaushan.className}`}><p>{t('noResult')}</p></div>)}
            
            {!isEnd && (
              <button
                className={styles.action}
                style={{ height: "30px", alignSelf: "center" }}
                onClick={() => {
                  setFilter((prevState) => ({
                    ...prevState,
                    pageSize: prevState.pageSize + settings.blogPagination,
                  }));
                }}
              >
                {t("load")}
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <LoadingSpinner size={70} color="#9e7441" padding="10rem" />
        </div>
      )}
    </div>
  );
};

export default BlogPosts;
