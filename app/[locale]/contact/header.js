import Image from "next/image";
import settings from "../settings";
import { getTranslations } from "next-intl/server";
import QueryString from "qs";
import styles from "./header.module.scss";

async function getHeaderInfo() {
  const query = QueryString.stringify({
    fields: ["contactImage"],
    populate: ["contactImage"],
  });
  const res = await fetch(`${settings.backendUrl}/api/restaurant?${query}`, {
    next: { revalidate: settings.revalidateTime },
  });
  const data = await res.json();
  return data.data.attributes.contactImage.data.attributes;
}

export default async function Header({ params }) {
  const t = await getTranslations("ContactPage");
  const headerImageData = await getHeaderInfo();
  return (
    <div className={styles.bgWrap}>
      <Image
        priority
        src={settings.backendUrl + headerImageData.url}
        fill
        alt={headerImageData.alternativeText}
        style={{
          objectFit: "cover",
          objectPosition: "0% 45%",
        }}
        quality={100}
        draggable={false}
      ></Image>
      <p className={styles.bgText}>
        {t("header")}
        <br />
        {t("event")}
      </p>
    </div>
  );
}
