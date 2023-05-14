"use client";

import { useState, useEffect } from "react";
import styles from "./filterPosts.module.scss";
import settings from "../settings";

const FilterPosts = (params) => {
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
      type: e.target.id,
    });
  };

  return (
    <div>
      {loadedTypes && (
        <fieldset>
          <legend>{params.translations.tags}</legend>
          <input type="radio" id="" name="type" onChange={handleChange} defaultChecked/>
          <label htmlFor="all">{params.translations.all}</label>
          {types.map((type) => (
            <div key={type.id}>
              <input
                type="radio"
                id={type.attributes.type}
                name="type"
                onChange={handleChange}
              />
              <label htmlFor={type.attributes.type}>
                {type.attributes.type}
              </label>
            </div>
          ))}
          
        </fieldset>
      )}
    </div>
  );
};

export default FilterPosts;
