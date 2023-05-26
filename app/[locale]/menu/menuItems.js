"use client";

import settings from "../settings";
import { useState, useEffect } from "react";
import style from "./menuItems.module.scss";
import QueryString from "qs";

const MenuItems = (params) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loadedMenuItems, setLoadedMenuItems] = useState(false);
  useEffect(() => {
    async function getMenuItems(locale, activeCategory, activeSubCategory) {
      const query = QueryString.stringify(
        {
          populate: ["category"],
          locale: [locale],
          filters: {
            category: {
              name: {
                $eq: activeSubCategory,
              },
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      const res = await fetch(
        `${settings.backendUrl}/api/${activeCategory.queryName}?${query}`,
        { next: { revalidate: settings.revalidateTime } }
      );
      const data = await res.json();
      setMenuItems(data.data);
      setLoadedMenuItems(true);
    }
    getMenuItems(
      params.locale,
      params.activeCategory,
      params.activeSubCategory
    );
  }, [params.locale, params.activeCategory, params.activeSubCategory]);

  return (
    <div>
      {loadedMenuItems && (
        <div className={style.menuItems}>
          {menuItems.map((item) => {
            return <div key={item.id}>{item.attributes.name} - {item.attributes.description}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default MenuItems;
