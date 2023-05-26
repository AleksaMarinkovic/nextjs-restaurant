"use client";

import { useState, useEffect } from "react";
import styles from "./blogPosts.module.scss";
import settings from "../settings";
import Card from "./card";
import FilterPosts from "./filterPosts";
import QueryString from "qs";

const BlogPosts = (params) => {
  const [filter, setFilter] = useState({
    pageSize: settings.blogPagination,
    locale: params.locale,
    type: ''
  });
  const [blogPosts, setBlogPosts] = useState([]);
  const [translations, setTranslations] = useState(params.translations);
  const [loadedBlogPosts, setLoadedBlogPosts] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    async function getBlogsNextPage(locale, pageSize) {

      const query = QueryString.stringify({
        sort: ['updatedAt:desc'],
        pagination: {
          page: 1,
          pageSize: pageSize
        },
        filters: {
          type: {
            type: {
              $contains: filter.type
            },
          },
        },
        fields: ['title', 'description', 'eventTime'],
        locale: [locale],
        populate: ['categories', 'thumbnail', 'type']
      }, {
        encodeValuesOnly: true,
      });
      const res = await fetch(
        `${settings.backendUrl}/api/blog-posts?${query}`,
        { next: { revalidate: settings.revalidateTime } }
      );
      const data = await res.json();
      setBlogPosts(data.data);
      setLoadedBlogPosts(true);
      if (data.meta.pagination.total === data.data.length) {
        setIsEnd(true);
      }else{
        setIsEnd(false);
      }
    }
    getBlogsNextPage(filter.locale, filter.pageSize);
  }, [filter]);


  const blogFilterHandler = (filter) => {
    setFilter(prevState => ({
      ...prevState,
      ...filter
    }))
  }

  return (
    <div>
      {loadedBlogPosts ? (
        <div>
          <FilterPosts filterHandler={blogFilterHandler} translations={translations} locale={filter.locale}></FilterPosts>
          <div className={styles.container}>
            {blogPosts.map((post) => {
              return (
                <Card
                  key={post.id}
                  locale={filter.locale}
                  post={post}
                  translations={translations}
                ></Card>
              );
            })}
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
                {translations.load}
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default BlogPosts;
