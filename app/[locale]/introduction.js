import Image from "next/image";
import styles from "./introduction.module.scss";
import settings from "./settings";
import mainImage from "../../public/bar-long.webp";
import { getTranslations } from "next-intl/server";
import Link from "next-intl/link";
import QueryString from "qs";
import { Kaushan_Script } from "next/font/google";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const todaysOpenningHours = (openningHours, t) => {
  const index = new Date().getDay();
  switch (index) {
    case 0:
      return { day: t("sunday"), hours: openningHours.sunday };
    case 1:
      return { day: t("monday"), hours: openningHours.monday };
    case 2:
      return { day: t("tuesday"), hours: openningHours.tuesday };
    case 3:
      return { day: t("wednesday"), hours: openningHours.wednesday };
    case 4:
      return { day: t("thursday"), hours: openningHours.thursday };
    case 5:
      return { day: t("friday"), hours: openningHours.friday };
    case 6:
      return { day: t("saturday"), hours: openningHours.saturday };
  }
};

async function getRestaurantInfo(locale) {
  const query = QueryString.stringify({
    fields: ["name", "description"],
    locale: [locale],
    populate: ["openningHours", "location", "contact"],
  });
  const res = await fetch(`${settings.backendUrl}/api/restaurant?${query}`, {
    next: { revalidate: settings.revalidateTime },
  });
  const data = await res.json();
  return data.data.attributes;
}

export default async function Introduction({ params }) {
  const locale = params.locale;
  const restaurantData = await getRestaurantInfo(locale);
  const t = await getTranslations("Homepage");
  const t1 = await getTranslations("Contact");
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <div className={styles.mobileHeader}>
          <div className={styles.introHeader}>
            <h1 className={kaushan.className}>{restaurantData.name}</h1>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            priority
            src={mainImage}
            alt="Bar inside of Pancetta"
            fill
            style={{
              objectFit: "cover",
            }}
          ></Image>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.desktopHeader}>
            <div className={styles.introHeader}>
              <h1 className={kaushan.className}>{restaurantData.name}</h1>
            </div>
          </div>

          <p className={styles.description}>{restaurantData.description}</p>
          <Link href="/menu" className={styles.mainButton} locale={locale}>
            {t("menu").toUpperCase()}
          </Link>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoSection}>
          <h2 className={kaushan.className}>{t("workingHours")} :</h2>

          <div>{todaysOpenningHours(restaurantData.openningHours, t1).day}</div>
          <div>
            {todaysOpenningHours(restaurantData.openningHours, t1).hours}
          </div>
        </div>
        <div className={styles.infoSection}>
          <h2 className={kaushan.className}>{t("address")} :</h2>

          <div>
            {restaurantData.location.street}, {restaurantData.location.city},{" "}
            {restaurantData.location.country}
          </div>
        </div>
        <div className={styles.infoSection}>
          <h2 className={kaushan.className}>{t("phone")} :</h2>
          <div>{restaurantData.contact.email}</div>
          <div>{restaurantData.contact.telephone}</div>
          <div>{restaurantData.contact.mobile}</div>
        </div>
      </div>
    </div>
  );
}
