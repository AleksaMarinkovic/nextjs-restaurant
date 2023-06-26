"use client";

import NavItem from "./navItem";
import styles from "./mobileHeader.module.scss";
import { useTranslations } from "next-intl";


const MobileHeader = ({ locale, clickHandler }) => {
  const t = useTranslations('Header');
  return (
    <div className={styles.mobileHeader}>
      <NavItem href="/" text={t("home")} locale={locale} clickHandler={clickHandler}/>
      <NavItem href="/menu" text={t("menu")} locale={locale}  clickHandler={clickHandler}/>
      <NavItem href="/gallery" text={t("gallery")} locale={locale}  clickHandler={clickHandler}/>
      <NavItem href="/blog" text={t("blog")} locale={locale}  clickHandler={clickHandler}/>
      <NavItem href="/contact" text={t("contact")} locale={locale}  clickHandler={clickHandler}/>
    </div>
  );
};

export default MobileHeader;
