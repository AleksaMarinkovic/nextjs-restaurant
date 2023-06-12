import { getTranslations } from "next-intl/server";
import styles from "./footer.module.scss";
import QueryString from "qs";
import settings from "./settings";
import { Link } from "next-intl";
import Image from "next/image";
import twitter from "../../public/294709_circle_twitter_icon.svg";
import instagram from "../../public/3225191_app_instagram_logo_media_popular_icon.svg";
import facebook from "../../public/317752_facebook_social media_social_icon.svg";
import tripadvisor from "../../public/3069745_circle_round icon_travel_tripadvisor_icon.svg";
import linkedin from "../../public/317750_linkedin_icon.svg";
import LanguagePicker from "./languagePicker";

async function getFooterInfo(locale) {
  const query = QueryString.stringify(
    {
      fields: ["name"],
      locale: [locale],
      populate: ["logo", "openningHours", "contact", "location", "socialMedia"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${settings.backendUrl}/api/restaurant?${query}`, {
    next: { revalidate: settings.revalidateTime },
  });
  const data = await res.json();
  return data.data;
}

export default async function Footer({ locale }) {
  const restaurantData = await getFooterInfo(locale);
  const t = await getTranslations("Footer");
  return (
    <div className={styles.container}>
      <div className={styles.sectionOne}>
        <div className={styles.footerColumn}>
          <h2 className={styles.footerColumnHeader}>{t("contact")}</h2>
          {restaurantData.attributes.contact.mobile && (
            <a
              href={"tel:" + restaurantData.attributes.contact.mobile}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {restaurantData.attributes.contact.mobile}
            </a>
          )}
          {restaurantData.attributes.contact.telephone && (
            <Link
              href={"tel:" + restaurantData.attributes.contact.telephone}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {restaurantData.attributes.contact.telephone}
            </Link>
          )}
        </div>
        <div className={styles.footerColumn}>
          <h2 className={styles.footerColumnHeader}>{t("write")}</h2>
          {restaurantData.attributes.contact.email && (
            <Link
              href={"mailto:" + restaurantData.attributes.contact.email}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {restaurantData.attributes.contact.email}
            </Link>
          )}
        </div>
        <Link href="/" locale={locale}>
          <Image
            alt="Restaurant logo"
            priority
            src={
              settings.backendUrl +
              restaurantData.attributes.logo.data.attributes.url
            }
            draggable={false}
            width={200}
            height={70}
          ></Image>
        </Link>
        <div className={styles.footerColumn}>
          <h2 className={styles.footerColumnHeader}>{t("address")}</h2>
          {restaurantData.attributes.location.mapLink ? (
            <Link
              href={restaurantData.attributes.location.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {restaurantData.attributes.location.street && (
                <p>{restaurantData.attributes.location.street}</p>
              )}
              {restaurantData.attributes.location.city && (
                <p>{restaurantData.attributes.location.city}</p>
              )}
              {restaurantData.attributes.location.country && (
                <p>{restaurantData.attributes.location.country}</p>
              )}
            </Link>
          ) : (
            <div className={styles.noLink}>
              {restaurantData.attributes.location.street && (
                <p>{restaurantData.attributes.location.street}</p>
              )}
              {restaurantData.attributes.location.city && (
                <p>{restaurantData.attributes.location.city}</p>
              )}
              {restaurantData.attributes.location.country && (
                <p>{restaurantData.attributes.location.country}</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.footerColumn}>
          <h2 className={styles.footerColumnHeader}>{t("follow")}</h2>
          <div className={styles.socialMediaRow}>
            {restaurantData.attributes.socialMedia.twitter && (
              <Link
                href={restaurantData.attributes.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={twitter}
                  width={40}
                  height={40}
                  alt={<p>{restaurantData.attributes.socialMedia.twitter}</p>}
                />
              </Link>
            )}
            {restaurantData.attributes.socialMedia.facebook && (
              <Link
                href={restaurantData.attributes.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={facebook}
                  width={40}
                  height={40}
                  alt={<p>{restaurantData.attributes.socialMedia.facebook}</p>}
                />
              </Link>
            )}
            {restaurantData.attributes.socialMedia.tripAdvisor && (
              <Link
                href={restaurantData.attributes.socialMedia.tripAdvisor}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={tripadvisor}
                  width={40}
                  height={40}
                  alt={
                    <p>{restaurantData.attributes.socialMedia.tripAdvisor}</p>
                  }
                />
              </Link>
            )}
            {restaurantData.attributes.socialMedia.instagram && (
              <Link
                href={restaurantData.attributes.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={instagram}
                  width={40}
                  height={40}
                  alt={<p>{restaurantData.attributes.socialMedia.instagram}</p>}
                />
              </Link>
            )}
            {restaurantData.attributes.socialMedia.linkedin && (
              <Link
                href={restaurantData.attributes.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={linkedin}
                  width={40}
                  height={40}
                  alt={<p>{restaurantData.attributes.socialMedia.linkedin}</p>}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={styles.sectionTwo}>
        <div className={styles.language}>
          <p>{t("chooseLanguage")}</p>
          <LanguagePicker locale={locale}></LanguagePicker>
        </div>
        <p>© Pancetta Concept Bar 2013 - 2023</p>

        <p>Website by Aleksa </p>
      </div>
    </div>
  );
}
