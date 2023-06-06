"use client";

import { useState, useEffect } from "react";
import styles from "./menu.module.scss";
import settings from "../settings";
import QueryString from "qs";
import MenuItems from "./menuItems";
import { Kaushan_Script } from "next/font/google";
import HighlightedFoods from "./highlightedFoods";
import LoadingSpinner from "../loadingSpinner";

const Categories = {
  Food: { categoryName: "food-categories", queryName: "Foods" },
  Drink: { categoryName: "drinks-categories", queryName: "Drinks" },
};

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const Menu = (params) => {
  const [activeCategory, setActiveCategory] = useState(Categories.Food);
  const [subCategories, setSubCategories] = useState([]);
  const [activeSubCategory, setActiveSubCategory] = useState();
  const [loadedSubCategories, setLoadedSubCategories] = useState(false);

  useEffect(() => {
    async function getCategories(locale) {
      const query = QueryString.stringify(
        {
          fields: ["name"],
          locale: [locale],
        },
        {
          encodeValuesOnly: true,
        }
      );
      const res = await fetch(
        `${settings.backendUrl}/api/${activeCategory.categoryName}?${query}`,
        { next: { revalidate: settings.revalidateTime } }
      );
      const data = await res.json();
      setSubCategories(data.data);
      if (data.data) {
        setActiveSubCategory(data.data[0].attributes.name);
        setLoadedSubCategories(true);
      }
    }
    getCategories(params.locale);
  }, [activeCategory, params.locale]);

  const onCategoryClick = (e) => {
    if (e.target.id === Categories.Drink.categoryName) {
      setActiveCategory(Categories.Drink);
    } else {
      setActiveCategory(Categories.Food);
    }
    console.log(
      e.target.id,
      Categories.Drink.categoryName,
      Categories.Food.categoryName
    );
  };

  const onSubCategoryClick = (e) => {
    setActiveSubCategory(e.target.id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={kaushan.className}>
        <h1 className={styles.header}>{params.translations.title}</h1>
      </div>
      <div className={styles.categories}>
        <div
          className={
            activeCategory.categoryName === Categories.Food.categoryName
              ? styles.categoryActive
              : styles.category
          }
          id={Categories.Food.categoryName}
          onClick={onCategoryClick}
        >
          {params.translations.food}
        </div>
        <div
          className={
            activeCategory.categoryName === Categories.Drink.categoryName
              ? styles.categoryActive
              : styles.category
          }
          id={Categories.Drink.categoryName}
          onClick={onCategoryClick}
        >
          {params.translations.drink}
        </div>
      </div>
      <div className={styles.separator}></div>
      {loadedSubCategories ? (
        <div className={styles.subCategories}>
          {subCategories.map((subCategory) => {
            return (
              <div
                key={subCategory.attributes.name}
                id={subCategory.attributes.name}
                className={
                  activeSubCategory === subCategory.attributes.name
                    ? styles.categoryActive
                    : styles.category
                }
                onClick={onSubCategoryClick}
              >
                {subCategory.attributes.name}
              </div>
            );
          })}
        </div>
      ) : (<LoadingSpinner size={50}/>)}
      <div className={styles.separator}></div>
      <MenuItems
        activeCategory={activeCategory}
        activeSubCategory={activeSubCategory}
        locale={params.locale}
      ></MenuItems>
    </div>
  );
};

export default Menu;
