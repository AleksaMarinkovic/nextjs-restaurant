import styles from "./page.module.scss";
import { getTranslations } from "next-intl/server";
import BlogPosts from "./blogPosts";

export default async function BlogPage({ params }) {
    const t = await getTranslations('Blog');
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>{t('blog')}</h1>
      <BlogPosts locale={params.locale}></BlogPosts>
    </div>
  );
}
