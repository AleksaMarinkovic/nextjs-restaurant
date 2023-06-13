import "./globals.scss";
import styles from "./layout.module.scss";
import Header from "./header";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Quicksand } from "next/font/google";
import Footer from "./footer";

export const metadata = {
  title: "Pancetta Concept Bar Novi Sad | Hrana, piće, svirke...",
  description:
    "Pancetta Concept Bar - savršen doručak subotom ujutru uz kafu, romantična večera sa partnerom ili izlasci uveče sa svojim prijateljima.",
};

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

async function getMessages(locale) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}


export default async function LocaleLayout({ children, params }) {
  const messages = await getMessages(params.locale);
  return (
    <html lang={params.locale} className={quicksand.className}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <div className={styles.container}>
            <Header locale={params.locale}></Header>
            <main>{children}</main>
            <Footer locale={params.locale}></Footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
