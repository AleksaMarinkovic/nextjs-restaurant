import settings from "../settings";
import styles from "./page.module.scss";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import BlogPosts from "./blogPosts";

export default async function BlogPage({ params }) {
    const t = await getTranslations('Blog');
    const translations = {
        load : t('load'),
        more: t('more'),
        close: t('close')
    }
  return (
    <div>
      <h1>BLOG:</h1>
      <BlogPosts locale={params.locale} translations={translations}></BlogPosts>
    </div>
  );
}
