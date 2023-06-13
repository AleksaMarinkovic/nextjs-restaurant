"use client";

import NavItem from "./navItem";
import styles from "./mobileHeader.module.scss";
import { useTranslations } from "next-intl";


const MobileHeader = ({ locale }) => {
  const t = useTranslations('Header');
  return (
    <div className={styles.mobileHeader}>
      <NavItem href="/" text={t("home")} locale={locale} />
      <NavItem href="/menu" text={t("menu")} locale={locale} />
      <NavItem href="/gallery" text={t("gallery")} locale={locale} />
      <NavItem href="/blog" text={t("blog")} locale={locale} />
      <NavItem href="/contact" text={t("contact")} locale={locale} />
    </div>
  );
};

export default MobileHeader;
