import { getTranslations } from "next-intl/server";
import styles from "./footer.module.scss";
import QueryString from "qs";
import settings from "./settings";
import { Link } from "next-intl";
import Image from "next/image";

async function getFooterInfo(locale) {
  const query = QueryString.stringify(
    {
      fields: ["name"],
      locale: [locale],
      populate: ["logo", "openningHours", "contact"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${settings.backendUrl}/api/restaurant?${query}`, {
    next: { revalidate: settings.revalidateTime },
  });
  const data = await res.json();
  return data.data;
}

export default async function Footer({ locale }) {
  const restaurantData = await getFooterInfo(locale);
  console.log(restaurantData);
  const t = await getTranslations("Footer");
  return (
    <div className={styles.container}>
      <div className={styles.sectionOne}>
        <Link className={styles.logoWrapper} href="/" locale={locale}>
          <Image
            alt="Restaurant logo"
            priority
            src={
              settings.backendUrl +
              restaurantData.attributes.logo.data.attributes.url
            }
            draggable={false}
            width={150}
            height={50}
          ></Image>
        </Link>
        <div className={styles.footerColumn}>
          <h2 className={styles.footerColumnHeader}>{t('contact')}</h2>
          <p>test</p>
          <p>test</p>
        </div>
        <div className={styles.footerColumn}>
          <h2 className={styles.footerColumnHeader}>{t('write')}</h2>
          <p>test</p>
          <p>test</p>
        </div>
        <div className={styles.footerColumn}>
          <h2 className={styles.footerColumnHeader}>{t('address')}</h2>
          <p>test</p>
          <p>test</p>
        </div>
        <div className={styles.footerColumn}>
          <h2 className={styles.footerColumnHeader}>{t('follow')}</h2>
          <p>test</p>
          <p>test</p>
        </div>
      </div>
      <div className={styles.sectionTwo}>
        <h3>
          Website by <span style={{ fontWeight: "400" }}>Aleksa</span>
        </h3>
        <h3>© Pancetta Concept Bar 2013 - 2023</h3>
      </div>
    </div>
  );
}
