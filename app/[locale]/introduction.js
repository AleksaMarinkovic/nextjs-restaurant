import Image from "next/image";
import styles from "./introduction.module.scss";
import settings from "./settings";
import mainImage from "../../public/bar-long.webp";
import { getTranslations } from "next-intl/server";
import {Link} from "next-intl";

async function getRestaurantInfo(locale) {
  const res = await fetch(
    `${settings.backendUrl}/api/restaurant?fields[0]=name&fields[1]=description&locale=${locale}`,
    { next: { revalidate: settings.revalidateTime } }
  );
  const data = await res.json();
  return data.data.attributes;
}

export default async function Introduction({ params }) {
  const locale = params.locale;
  const restaurantData = await getRestaurantInfo(locale);
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
            style={{display:'block'}}
          ></Image>
        </div>
        <div className={styles.textWrapper}>
          <h1>{restaurantData.name}</h1>
          <p>{restaurantData.description}</p>
          <Link href="/menu"  className={styles.mainButton} locale={locale}>{t("menu").toUpperCase()}</Link>
        </div>
      </div>
    </div>
  );
}
