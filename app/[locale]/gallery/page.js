import styles from "./page.module.scss";
import { getTranslations } from "next-intl/server";
import Gallery from './gallery';

export default async function GalleryPage({ params }) {
    const t = await getTranslations('Gallery');
    const translations = {
        header : t('header'),
    }
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>{t('header')}</h1>
      <Gallery locale={params.locale} translations={translations}></Gallery>
    </div>
  );
}
