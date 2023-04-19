"use client";

import { usePathname } from "next-intl/client";
import styles from "./navItem.module.scss";
import { Link } from "next-intl";

const NavItem = ({ href, text, locale }) => {
  const pathname = usePathname();
  // line below is needed for it to be prerendered on the server (usePathname returns null on the server)
  const newPathname = pathname === null ? "/" : pathname;
  return (
    <Link href={href} className={pathname === href ? styles.navItemActive : styles.navItemNonActive} locale={locale}>
      {text}
    </Link>
  );
};
export default NavItem;
