import "./globals.scss";
import styles from './layout.module.scss'
import Header from "./header";
import { useLocale } from "next-intl";
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

export default function LocaleLayout({ children, params }) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale} className={quicksand.className}>
      <body>
        <div className={styles.container}>
          <Header locale={params.locale}></Header>
          <main>{children}</main>
          <Footer locale={params.locale}></Footer>
        </div>
      </body>
    </html>
  );
}
