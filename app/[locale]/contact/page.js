import styles from "./contact.module.scss";
import { settings } from "../settings";
import { getTranslations } from "next-intl/server";

async function getContactData(locale) {
  const res = await fetch(
    `${settings.backendUrl}/api/restaurant?populate[0]=location&populate[1]=socialMedia&populate[2]=contact&populate[3]=openningHours&locale=${locale}`,
    { next: { revalidate: settings.revalidateTime } }
  );
  const data = await res.json();
  return data.data.attributes;
}

export default async function ContactPage({ params }) {
  const contactData = await getContactData(params.locale);
  const t = await getTranslations("Contact");
  return (
    <div>
      <section>
        <h1>{t("openningHours")}</h1>
        <p>
          {t("monday")} : {contactData.openningHours.monday}
        </p>
        <p>
          {t("tuesday")} : {contactData.openningHours.tuesday}
        </p>
        <p>
          {t("wednesday")} : {contactData.openningHours.wednesday}
        </p>
        <p>
          {t("thursday")} : {contactData.openningHours.thursday}
        </p>
        <p>
          {t("friday")} : {contactData.openningHours.friday}
        </p>
        <p>
          {t("saturday")} : {contactData.openningHours.saturday}
        </p>
        <p>
          {t("sunday")} : {contactData.openningHours.sunday}
        </p>
      </section>
      <section>
        <h1>{t("socialMedia")}</h1>
        <a href={contactData.socialMedia.facebook} target="_blank">
          Facebook
        </a>
        <br/>
        <a href={contactData.socialMedia.tripAdvisor} target="_blank">
          Trip Advisor
        </a>
      </section>
      <section>
        <h1>{t("location")}</h1>
        <p>{contactData.location.street}</p>
        <p>{contactData.location.city}</p>
        <p>{contactData.location.country}</p>
      </section>
    </div>
  );
}
