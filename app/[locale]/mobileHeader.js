"use client";

import NavItem from "./navItem";
import styles from "./mobileHeader.module.scss";

const MobileHeader = ({ translations, locale }) => {
  return (
    <div className={styles.mobileHeader}>
      <NavItem href="/" text={translations.home} locale={locale} />
      <NavItem href="/menu" text={translations.menu} locale={locale} />
      <NavItem href="/gallery" text={translations.gallery} locale={locale} />
      <NavItem href="/blog" text={translations.blog} locale={locale} />
      <NavItem href="/contact" text={translations.contact} locale={locale} />
    </div>
  );
};

export default MobileHeader;
