"use client";

import { Navigation, Autoplay } from "swiper";
import styles from "./highlightedFoods.module.scss";
import settings from "./settings";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Merienda } from "next/font/google";

import "swiper/css";
import "swiper/css/navigation";

const merienda = Merienda({
  subsets: ["latin"],
  display: "swap",
});

const HighlightedFoods = ({ params }) => {
  const [highlightedFoodsData, setHighlightedFoodsData] = useState();
  const [loadedHighlightedFoodsInfo, setLoadedHighlightedFoodsInfo] = useState(false);

  useEffect(() => {
    async function getHighlightedFoodsData(locale) {
      const res = await fetch(
        `${settings.backendUrl}/api/foods?filters[highlighted][$eq]=true&populate[0]=primaryImage&locale=${locale}`,
        { next: { revalidate: settings.revalidateTime } }
      );
      const data = await res.json();
      setHighlightedFoodsData(data.data);
      setLoadedHighlightedFoodsInfo(true);
    }
    getHighlightedFoodsData(params.locale);
  }, []);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Izdvajamo: </h1>
      <div className={styles.table}>
        {loadedHighlightedFoodsInfo && (
          <div className={merienda.className}>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              centeredSlides
              navigation={true}
              loop
              speed={2000}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              style={{
                "--swiper-pagination-color": "#f5deb3",
                "--swiper-navigation-color": "#f5deb3",
                textAlign: "center",
              }}
            >
              {highlightedFoodsData ? (
                highlightedFoodsData.map((food, i) => {
                  return (
                    <SwiperSlide key={i} style={{ display: "inline-block" }}>
                      <div className={styles.foodCard}>
                        <Image
                          alt={
                            food.attributes.primaryImage.data.attributes.name
                          }
                          src={
                            settings.backendUrl +
                            food.attributes.primaryImage.data.attributes.url
                          }
                          priority
                          width={500}
                          height={500}
                        ></Image>
                      </div>
                      <div className={merienda.className}>
                        <div className={styles.foodCardName}>
                          {food.attributes.name}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              ) : (
                <div>Loading</div>
              )}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default HighlightedFoods;
