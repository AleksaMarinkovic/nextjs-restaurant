import styles from "./page.module.scss";
import { getTranslations } from "next-intl/server";
import BlogPosts from "./blogPosts";

export default async function BlogPage({ params }) {
    const t = await getTranslations('Blog');
  return (
    <div className={styles.wrapper}>
      <BlogPosts locale={params.locale}></BlogPosts>
    </div>
  );
}
