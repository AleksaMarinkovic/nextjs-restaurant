import settings from "../settings";
import { getTranslations } from "next-intl/server";

async function getMenuItems(locale) {
  const res = await fetch(
    `${settings.backendUrl}/api/foods?sort[0]=price&sort[1]=description&pagination[page]=1&pagination[pageSize]=200&locale=${locale}`,
    { next: { revalidate: settings.revalidateTime } }
  );
  const data = await res.json();
  return data.data;
}

export default async function MenuPage({ params }) {
  const menuItems = await getMenuItems(params.locale);
  const t = await getTranslations("Menu");
  return (
    <div>
      <h1>{t("title")}</h1>
      {menuItems?.map((menuItem) => {
        return (
          <div key={menuItem.id}>
            {menuItem.id +
              "  " +
              menuItem.attributes.name +
              "  " +
              menuItem.attributes.price +
              "rsd  " +
              menuItem.attributes.description}
          </div>
        );
      })}
    </div>
  );
}
