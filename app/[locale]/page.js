import styles from "./page.module.scss";
import { settings } from "./settings";

async function getPageData(locale) {
  const res = await fetch(
    `${settings.backendUrl}/api/restaurant?locale=${locale}`,
    { next: { revalidate: settings.revalidateTime } }
  );
  const data = await res.json();
  return data.data.attributes;
}

export default async function Home({ params }) {
  const pageData = await getPageData(params.locale);
  return (
    <div>
      <h1>{pageData.name}</h1>
      <p>{pageData.description}</p>
    </div>
  );
}
