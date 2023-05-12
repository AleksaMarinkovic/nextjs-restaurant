"use client";

import { useState, useEffect } from "react";
import styles from "./blogPosts.module.scss";
import Image from "next/image";
import settings from "../settings";
import ReactModal from "react-modal";
import Card from "./card";

const BlogPosts = (params) => {
  const [pageSize, setPageSize] = useState(settings.blogPagination);
  const [locale, setLocale] = useState(params.locale);
  const [blogPosts, setBlogPosts] = useState([]);
  const [translations, setTranslations] = useState(params.translations);
  const [loadedBlogPosts, setLoadedBlogPosts] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState();

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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {loadedBlogPosts ? (
        <div className={styles.container}>
          {blogPosts.map((post) => {
            return (
              <Card key={post.id} locale={locale} post={post} translations={translations}></Card>
            );
          })}
          {!isEnd && (
            <button
              className={styles.action}
              style={{ height: "30px", alignSelf: "center" }}
              onClick={() => {
                setPageSize(pageSize + settings.blogPagination);
              }}
            >
              {translations.load}
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default BlogPosts;
