"use client";

import { Navigation, Autoplay } from "swiper";
import styles from "./page.module.scss";
import { settings } from "./settings";
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

export default function Home({ params }) {
  const [aboutData, setAboutData] = useState();
  const [highlightedFoodsData, setHighlightedFoodsData] = useState();
  const [loadedRestaurantInfo, setLoadedRestaurantInfo] = useState(false);
  const [loadedHighlightedFoodsInfo, setHighlightedFoodsInfo] = useState(false);

  useEffect(() => {
    async function getAboutData(locale) {
      const res = await fetch(
        `${settings.backendUrl}/api/restaurant?locale=${locale}`,
        { next: { revalidate: settings.revalidateTime } }
      );
      const data = await res.json();
      setAboutData(data.data.attributes);
      setLoadedRestaurantInfo(true);
    }

    async function getHighlightedFoodsData(locale) {
      const res = await fetch(
        `${settings.backendUrl}/api/foods?filters[highlighted][$eq]=true&populate[0]=primaryImage&locale=${locale}`,
        { next: { revalidate: settings.revalidateTime } }
      );
      const data = await res.json();
      console.log(data.data);
      setHighlightedFoodsData(data.data);
      setHighlightedFoodsInfo(true);
    }
    getAboutData(params.locale);
    getHighlightedFoodsData(params.locale);
  }, []);

  return (
    <div className={styles.pageBackground}>
      {loadedHighlightedFoodsInfo && loadedRestaurantInfo && (
        <div className={merienda.className}>
          <div className={styles.headerAndDescription}>
            <h1 className={styles.pageHeader}>{aboutData.name}</h1>
            <p className={styles.pageDescription}>{aboutData.description}</p>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
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
                        alt={food.attributes.primaryImage.data.attributes.name}
                        src={
                          settings.backendUrl +
                          food.attributes.primaryImage.data.attributes.url
                        }
                        width={500}
                        height={500}
                      ></Image>
                      <div className={merienda.className}>
                        <div className={styles.foodCardName}>
                          {food.attributes.name}
                        </div>
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
  );
}
