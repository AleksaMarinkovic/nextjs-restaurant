"use client";

import { usePathname } from "next-intl/client";
import styles from "./navItem.module.scss";
import Link from "next-intl/link";

const NavItem = ({ href, text, locale, clickHandler}) => {
  const pathname = usePathname();
  // line below is needed for it to be prerendered on the server (usePathname returns null on the server)
  const newPathname = pathname === null ? "/" : pathname;
  const onClickHandler = () => {
    if(clickHandler){
      clickHandler();
    }
  }
  return (
    <Link href={href} className={newPathname === href ? styles.navItemActive : styles.navItemNonActive} locale={locale} onClick={onClickHandler}>
      {text}
    </Link>
  );
};
export default NavItem;
