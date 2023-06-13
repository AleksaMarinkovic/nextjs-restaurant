import styles from "./page.module.scss";
import { getTranslations } from "next-intl/server";
import Gallery from "./gallery";
import { Kaushan_Script } from "next/font/google";

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default async function GalleryPage({ params }) {
  const t = await getTranslations("Gallery");
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={kaushan.className}>
          <h1 className={styles.headerText}>{t("header")}</h1>
        </div>
      </div>
      <Gallery locale={params.locale}></Gallery>
    </div>
  );
}
