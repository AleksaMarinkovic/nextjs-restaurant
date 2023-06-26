import { getTranslations } from "next-intl/server";
import HighlightedFoods from "./highlightedFoods";
import styles from "./page.module.scss";
import Menu from "./menu";
import { Baskervville } from "next/font/google";

const baskervville = Baskervville({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
export default async function MenuPage({ params }) {
  const t = await getTranslations("Menu");
  return (
    <div className={`${baskervville.className} ${styles.container}`}>
      <div className={styles.wrapper}>
        <div className={styles.background}>          
          <Menu locale={params.locale}></Menu>
        </div>
      </div>      
    </div>
  );
}
