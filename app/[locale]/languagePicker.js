'use client';
import Image from "next/image";
import FlagSerbia from "../../public/Flag-Serbia_50x30.webp";
import FlagUk from "../../public/Flag-UK_50x30.webp";
import styles from "./languagePicker.module.scss";
import { Link } from "next-intl";

const LanguagePicker = () => {
  return (
    <div className={styles.languagePicker}>
      <Link href='/' locale='sr'>
        <Image
          alt="Serbian language"
          src={FlagSerbia}
          width={50}
          height={30}
          className={styles.image}
          title="Serbian"
        ></Image>
      </Link>
      <Link href='/' locale='en'>
        <Image
          alt="English language"
          src={FlagUk}
          width={50}
          height={30}
          className={styles.image}
          title="English"
        ></Image>
      </Link>
    </div>
  );
};

export default LanguagePicker;
