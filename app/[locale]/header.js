import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { settings } from "./settings";
import LanguagePicker from "./languagePicker";
import { getTranslations } from "next-intl/server";

async function getHeaderInfo(locale) {
  const res = await fetch(
    `${settings.backendUrl}/api/restaurant?fields[0]=name&populate[0]=logo&populate[1]=openningHours&populate[2]=contact&locale=${locale}`,
    { next: { revalidate: settings.revalidateTime } }
  );
  const data = await res.json();
  return data.data;
}

const dayOpenningHourInfo = (openningHours) => {
  const today = new Date().getDay();
  switch (today) {
    case 0:
      return openningHours.sunday;
    case 1:
      return openningHours.monday;
    case 2:
      return openningHours.tuesday;
    case 3:
      return openningHours.wednesday;
    case 4:
      return openningHours.thursday;
    case 5:
      return openningHours.friday;
    case 6:
      return openningHours.saturday;
  }
};

export default async function Header({ locale }) {
  const headerInfo = await getHeaderInfo(locale);
  const t = await getTranslations("Homepage");
  return (
    <header className={styles.header}>
      <div className={styles.leftSideMenu}>
        {t("openningHours")}
        {dayOpenningHourInfo(headerInfo.attributes.openningHours)}
      </div>
      <div className={styles.middleMenu}>
        <div className={styles.logoWrapper}>
          <Image
            alt="Restaurant logo"
            src={
              settings.backendUrl +
              headerInfo.attributes.logo.data.attributes.url
            }
            draggable={false}
            width={250}
            height={250}
          ></Image>
        </div>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navItemNonActive}>
          {t("home")}
        </Link>
        <Link href="/contact" className={styles.navItemNonActive}>
          {t("contact")}
        </Link>
        <Link href="/menu" className={styles.navItemNonActive}>
          {t("menu")}
        </Link>
      </nav>
      <div className={styles.rightSideMenu}>
        <LanguagePicker></LanguagePicker>
      </div>
    </header>
  );
}
