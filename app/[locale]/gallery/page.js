import { getTranslations } from "next-intl/server";

 export default async function Gallery({params}){
  const t = await getTranslations("Homepage");
  return(<div>{t("gallery")}</div>)
}