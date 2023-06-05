"use client";

import settings from "../settings";
import { useState, useEffect } from "react";
import style from "./menuItems.module.scss";
import QueryString from "qs";
import MenuItem from "./menuItem";

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
    <div className={style.wrapper}>
      {loadedMenuItems && (
        <div className={style.menuItems}>
          {menuItems.map((item) => {
            return (<MenuItem key={item.id} name={item.attributes.name} description={item.attributes.description} price={item.attributes.price}></MenuItem>);
          })}
        </div>
      )}
    </div>
  );
};

export default MenuItems;
