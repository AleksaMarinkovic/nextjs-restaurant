import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { settings } from "./settings";

async function getHeaderInfo() {
  const res = await fetch(
    settings.backendUrl +
      "/api/restaurant?fields[0]=name&populate[0]=logo&populate[1]=openningHours&populate[2]=contact",
    { next: { revalidate: 20 } }
  );
  const data = await res.json();
  return data.data;
}

const Header = async () => {
  const headerInfo = await getHeaderInfo();
  return (
    <header className={styles.header}>
      <Image
        alt="Restaurant logo"
        src={
          settings.backendUrl + headerInfo.attributes.logo.data.attributes.url
        }
        width={250}
        height={250}
      ></Image>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navItemActive}>
          Home
        </Link>
        <Link href="/contact" className={styles.navItemActive}>
          Contact
        </Link>
        <Link href="/menu" className={styles.navItemActive}>
          Menu
        </Link>
      </nav>
    </header>
  );
};

export default Header;
