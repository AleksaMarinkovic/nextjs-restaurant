import Link from "next/link";
import "./globals.scss";
import Header from "./header";

export const metadata = {
  title: "Pancetta Concept Bar Novi Sad | Hrana, piće, svirke...",
  description:
    "Pancetta Concept Bar - savršen doručak subotom ujutru uz kafu, romantična večera sa partnerom ili izlasci uveče sa svojim prijateljima.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Header></Header>
        <main>{children}</main>
      </body>
    </html>
  );
}
