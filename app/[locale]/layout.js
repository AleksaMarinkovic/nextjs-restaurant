import "./globals.scss";
import Header from "./header";
import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {Open_Sans} from 'next/font/google';

export const metadata = {
  title: "Pancetta Concept Bar Novi Sad | Hrana, piće, svirke...",
  description:
    "Pancetta Concept Bar - savršen doručak subotom ujutru uz kafu, romantična večera sa partnerom ili izlasci uveče sa svojim prijateljima.",
};

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap'
})

export default function LocaleLayout({ children, params }) {
  const locale = useLocale();

  if(params.locale !== locale){
    notFound();
  }

  return (
    <html lang={locale} className={openSans.className}>
      <body>
      <Header locale={params.locale}></Header>
        <main>{children}</main>
      </body>
    </html>
  );
}
