import Image from "next/image";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import gov from '@/public/guvernul.jpg'
import {HomePageGategories} from "@/components/Homepage/Categories";
import {LastArticles} from "@/components/Homepage/LatestNews";
import {SlideNews} from "@/components/Homepage/SlideNews";
import {VideoArticles} from "@/components/Homepage/VideoArticles";
import {FeaturedArticlesList} from "@/components/Homepage/FeaturedArticlesList";
import {SpecialArticle} from "@/components/Homepage/SpecialArticle";
import {LiveArticle} from "@/components/Homepage/LiveArticle";
import {HomePageTopBanner} from "@/components/AdBanners/HomePageTopBanner";

const i18nNamespaces = ['homepage'];

export default async function Home({ params: {locale} }) {
  const { resources } = await initTranslations(locale, i18nNamespaces)

  return <TranslationsProvider
    namespaces={i18nNamespaces}
    locale={locale}
    resources={resources}
  >
    <LiveArticle />
    <SpecialArticle />
    {/*<HomePageTopBanner />*/}
    <FeaturedArticlesList />
    <div className="flex justify-center items-center py-6">
      <a href="http://drrm.gov.ro/w/"><Image src={gov}  alt="Departamentul pentru Relația cu Republica Moldova" /></a>
    </div>
    <div className="bg-white py-6">
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="flex flex-row flex-wrap">
        {/* LEFT */}
          <LastArticles />
        {/* RIGHT */}
          <HomePageGategories />
        </div>
      </div>
    </div>
    <SlideNews />
    <VideoArticles />
  </TranslationsProvider>
}
