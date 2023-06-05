import styles from "./page.module.scss";
import { getTranslations } from "next-intl/server";
import BlogPosts from "./blogPosts";

export default async function BlogPage({ params }) {
    const t = await getTranslations('Blog');
    const translations = {
        load : t('load'),
        more: t('more'),
        close: t('close'),
        tags: t('tags'),
        all: t('all')
    }
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>{t('blog')}</h1>
      <BlogPosts locale={params.locale} translations={translations}></BlogPosts>
    </div>
  );
}
