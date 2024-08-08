import {useParams} from "next/navigation";
import moment from "moment";
import Link from "next/link";
import 'moment/locale/ro'
import {ArticleImage} from "@/components/Homepage/LatestNews/ArticleImage";

export const ArticleItem = ({article}) => {

  const {locale} = useParams()

  // moment.locale(locale)

  const {article_id, images, translations, category} = article

  const thumbnail = images?.find(i=>i.is_main)

  const {title, published_at, slug} = translations?.find(t=>t.locale===locale)

  const date = moment(published_at).format("LLL")

  return <div className="my-2 flex-shrink max-w-full w-full md:w-1/2 lg:w-full xl:w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
    {
      images?.length > 0 ? <div className="flex flex-row shadow-md border-gray-500">
        <div className="w-1/2 mr-3"><ArticleImage title={title} image={thumbnail}/></div>

        <div className="w-2/3">
          <Link
              href={`/${locale}/articles/${category.translations.find(t => t.locale === locale).slug}/${article_id}/${slug}`}>
            <h1 className="font-title font-bold text-lg">
              {title}
            </h1>
          </Link>

          <div className="text-gray-500 text-sm mt-2 font-text">{date}</div>
        </div>
      </div> : <div className="w-full flex-row shadow-sm border-b-2">
        <Link
            href={`/${locale}/articles/${category.translations.find(t => t.locale === locale).slug}/${article_id}/${slug}`}>
          <h1 className="font-title font-bold">
            {title}
          </h1>
        </Link>
        <div className="text-gray-500 text-sm mt-7 font-text">{date}</div>
      </div>
    }
  </div>
}