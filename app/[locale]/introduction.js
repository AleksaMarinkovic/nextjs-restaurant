import Image from "next/image";
import styles from "./introduction.module.scss";
import settings from "./settings";
import mainImage from "../../public/bar-long.webp";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

async function getRestaurantInfo(locale) {
  const res = await fetch(
    `${settings.backendUrl}/api/restaurant?fields[0]=name&fields[1]=description&locale=${locale}`,
    { next: { revalidate: settings.revalidateTime } }
  );
  const data = await res.json();
  return data.data.attributes;
}

export default async function Introduction({ params }) {
  const restaurantData = await getRestaurantInfo(params.locale);
  const t = await getTranslations("Homepage");
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src={mainImage}
            alt="Bar inside of Pancetta"
            width={455}
            height={682}
          ></Image>
        </div>
        <div className={styles.textWrapper}>
          <h1 className={styles.header}>{restaurantData.name}</h1>
          <p className={styles.description}>{restaurantData.description}</p>
          <Link href="/menu"  className={styles.mainButton}>{t("menu").toUpperCase()}</Link>
        </div>
      </div>
    </div>
  );
}
