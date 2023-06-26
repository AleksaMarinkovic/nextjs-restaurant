"use client";

import { useState, useEffect } from "react";
import styles from "./filterPosts.module.scss";
import settings from "../settings";
import { useTranslations } from "next-intl";
import { Kaushan_Script } from "next/font/google";

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const FilterPosts = (params) => {
  const t = useTranslations("Blog");
  const [types, setTypes] = useState([]);
  const [loadedTypes, setLoadedTypes] = useState(false);
  useEffect(() => {
    async function getBlogTypes(locale) {
      const res = await fetch(
        `${settings.backendUrl}/api/blog-post-types?locale=${locale}`,
        { next: { revalidate: settings.revalidateTime } }
      );
      const data = await res.json();
      setTypes(data.data);
      setLoadedTypes(true);
    }
    getBlogTypes(params.locale);
  }, [params.locale]);

  const handleChange = (e) => {
    params.filterHandler({
      type: e.target.value,
    });
  };

  return (
    <div className={styles.wrapper}>
      {loadedTypes && (
        <fieldset className={styles.fieldset}>
          <legend className={`${styles.legend} ${kaushan.className}`}>
            &nbsp;{t("tags")}&nbsp;
          </legend>
          <div className={styles.options}>
            {types.map((type) => (
              <div key={type.id} className={styles.radio}>
                <input
                  type="radio"
                  id={type.attributes.type}
                  value={type.attributes.type}
                  name="type"
                  onChange={handleChange}
                />
                <label htmlFor={type.attributes.type} className={styles.label}>
                  &nbsp;{type.attributes.type}
                </label>
              </div>
            ))}
            <div className={styles.radio}>
              <input
                type="radio"
                id="all"
                value={''}
                name="type"
                onChange={handleChange}
                defaultChecked
              />
              <label htmlFor="all" className={styles.label}>
                &nbsp;{t("all")}
              </label>
            </div>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default FilterPosts;
