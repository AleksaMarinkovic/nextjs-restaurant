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

const baskervville = Baskervville({
  subsets: ["latin"],
  display: "swap",
  weight: '400'
});

export default async function Header({ locale }) {
  const headerInfo = await getHeaderInfo(locale);
  const t = await getTranslations("Header");
  return (
    <div className={styles.headerWrapper}>
      <div className={baskervville.className}>
        <header className={styles.header}>
          <Link className={styles.logoWrapper} href="/" locale={locale}>
            <Image
              alt="Restaurant logo"
              priority
              src={
                settings.backendUrl +
                headerInfo.attributes.logo.data.attributes.url
              }
              draggable={false}
              width={175}
              height={60}
            ></Image>
          </Link>
          <nav className={styles.nav}>
            <NavItem href="/" text={t("home")} locale={locale}/>
            <NavItem href="/menu" text={t("menu")} locale={locale}/>
            <NavItem href="/gallery" text={t("gallery")} locale={locale}/>
            <NavItem href="/blog" text={t("blog")} locale={locale}/>
            <NavItem href="/contact" text={t("contact")} locale={locale}/>
          </nav>
        </header>
      </div>
    </div>
  );
}
