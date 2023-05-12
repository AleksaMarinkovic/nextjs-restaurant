import styles from "./header.module.scss";
import Image from "next/image";
import { Link } from "next-intl";
import settings from "./settings";
import LanguagePicker from "./languagePicker";
import { getTranslations } from "next-intl/server";
import { Baskervville } from "next/font/google";
import NavItem from "./navItem";

async function getHeaderInfo(locale) {
  const res = await fetch(
    `${settings.backendUrl}/api/restaurant?fields[0]=name&populate[0]=logo&populate[1]=openningHours&populate[2]=contact&locale=${locale}`,
    { next: { revalidate: settings.revalidateTime } }
  );
  const data = await res.json();
  return data.data;
}

const bskervville = Baskervville({
  subsets: ["latin"],
  display: "swap",
  weight: '400'
});

export default async function Header({ locale }) {
  const headerInfo = await getHeaderInfo(locale);
  const t = await getTranslations("Homepage");
  return (
    <div className={styles.headerWrapper}>
      <div className={bskervville.className}>
        <header className={styles.headerNew}>
          <div className={styles.logoWrapper}>
            <Image
              alt="Restaurant logo"
              priority
              src={
                settings.backendUrl +
                headerInfo.attributes.logo.data.attributes.url
              }
              draggable={false}
              width={200}
              height={65}
            ></Image>
          </div>
          <nav className={styles.nav}>
            <NavItem href="/" text={t("home")} locale={locale}/>
            <NavItem href="/menu" text={t("menu")} locale={locale}/>
            <NavItem href="/gallery" text={t("gallery")} locale={locale}/>
            <NavItem href="/blog" text={t("blog")} locale={locale}/>
            <NavItem href="/contact" text={t("contact")} locale={locale}/>
            <div className={styles.rightSideMenu}>
              <LanguagePicker locale={locale}></LanguagePicker>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
