import { getTranslations } from "next-intl/server";
import HighlightedFoods from "./highlightedFoods";
import styles from "./page.module.scss";
import Image from "next/image";
import Leaf from "../../../public/h3.png";
import Menu from "./menu";
import { Baskervville } from "next/font/google";

const baskervville = Baskervville({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
export default async function MenuPage({ params }) {
  const t = await getTranslations("Menu");
  const translations = {
    food: t("food"),
    drink: t("drink"),
    title: t("title"),
  };
  return (
    <div className={baskervville.className}>
      <div className={styles.wrapper}>
        <div className={styles.background}>
          <Image
            src={Leaf}
            className={styles.leaf1}
            alt="Leaf"
            draggable="false"
          ></Image>
          <Menu translations={translations} locale={params.locale}></Menu>
          <Image
            src={Leaf}
            className={styles.leaf2}
            alt="Leaf"
            draggable="false"
          ></Image>
        </div>
      </div>
    </div>
  );
}
