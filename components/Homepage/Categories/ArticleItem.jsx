"use client"
import Link from "next/link";
import moment from "moment";
import 'moment/locale/ro'
import {useParams} from "next/navigation";

export const ArticleItem = ({article}) => {

  const {locale} = useParams();

  const {translations, category, article_id} = article

  // const {title, published_at, slug} = translations?.find(t => t.locale === locale)
  const translated = translations?.find(t => t.locale === locale)

  const date = moment(translated?.published_at).format("LL")

  return article && <div className="pb-5">
    <Link
        href={`/${locale}/articles/${category.translations.find(t => t.locale === locale).slug}/${article_id}/${translated?.slug}`}>
      <h1 className="font-title font-bold text-lg">
        {
          translated?.title
        }
      </h1>
    </Link>

    <div className="text-gray-500 text-sm mt-2 font-text">{date}</div>
  </div>
}