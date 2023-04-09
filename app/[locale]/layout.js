import "./globals.scss";
import Header from "./header";
import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';

export const metadata = {
  title: "Pancetta Concept Bar Novi Sad | Hrana, piće, svirke...",
  description:
    "Pancetta Concept Bar - savršen doručak subotom ujutru uz kafu, romantična večera sa partnerom ili izlasci uveče sa svojim prijateljima.",
};

export default function LocaleLayout({ children, params }) {
  const locale = useLocale();

  if(params.locale !== locale){
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
      <Header></Header>
        <main>{children}</main>
      </body>
    </html>
  );
}
