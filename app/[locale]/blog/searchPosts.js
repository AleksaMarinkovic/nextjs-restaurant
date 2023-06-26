"use client";

import { useState, useEffect } from "react";
import styles from "./searchPosts.module.scss";
import settings from "../settings";
import { useTranslations } from "next-intl";
import { Kaushan_Script } from "next/font/google";

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const SearchPosts = (params) => {
  const t = useTranslations("Blog");

  const handleChange = (e) => {
    params.filterHandler({
      title: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        onChange={handleChange}
        placeholder={t('search')}
      ></input>
    </div>
  );
};

export default SearchPosts;
