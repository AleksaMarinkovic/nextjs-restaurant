'use client'; 

import {usePathname} from 'next-intl/client';
import Image from "next/image";
import FlagSerbia from "../../public/Flag-Serbia_50x30.webp";
import FlagUk from "../../public/Flag-UK_50x30.webp";
import styles from "./languagePicker.module.scss";
import { Link } from "next-intl";

const LanguagePicker = ({locale}) => {
  const pathname = usePathname();
  // line below is needed for it to be prerendered on the server (usePathname returns null on the server)
  const newPathname = pathname === null ? '/': pathname;
  return (
    <div className={styles.languagePicker}>
      <Link href={newPathname} locale='sr' className={locale =='sr' ? styles.linkStyleActive : styles.linkStyle}>
        <Image
          alt="Serbian language"
          src={FlagSerbia}
          width={35}
          height={20}
          className={styles.image}
          title="Serbian"
        ></Image>
      </Link>
      <Link href={newPathname} locale='en' className={locale =='en' ? styles.linkStyleActive : styles.linkStyle}>
        <Image
          alt="English language"
          src={FlagUk}
          width={35}
          height={20}
          className={styles.image}
          title="English"
        ></Image>
      </Link>
    </div>
  );
};

export default LanguagePicker;
