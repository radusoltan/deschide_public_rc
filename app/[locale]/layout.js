import { Open_Sans, League_Spartan } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import "./globals.css";
import i18nConfig from "@/i18nConfig"
import { dir } from 'i18next';
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";


const logo = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400','500','600','700'],
  variable: "--logo"
})
const title = League_Spartan({
  subsets: ['latin', 'latin-ext'],
  weight: ['400','500','600','700'],
  variable: "--title"
})

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  description: "Portal de stiri din Republica Moldova",
  openGraph: {
    title: process.env.NEXT_PUBLIC_SITE_NAME,
    description: "Portal de stiri din Republica Moldova",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'ro',
    type: "website",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
    languages: {
      ro: `${process.env.NEXT_PUBLIC_SITE_URL}/ro`,
      en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
      ru: `${process.env.NEXT_PUBLIC_SITE_URL}/ru`,
    }
  }
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({ children, params: {locale} }) {
  return <html lang={locale} dir={dir(locale)}>
  <body className={`${logo.variable} ${title.variable}`}>
  <GoogleAnalytics gaId="G-7E5YRG7F5M" />
  <GoogleTagManager gtmId="GTM-PGQJHFTQ" />
    <Header/>
    {children}
  <Footer />
  </body>
</html>
}
