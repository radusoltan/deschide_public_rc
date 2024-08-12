import {useParams} from "next/navigation";
import useWindowSize from "@/utils";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

export const PopularArticleItem = ({article}) => {
  const {locale} = useParams()

  moment.locale(locale)

  const {images, translations, visits, category, article_id} = article

  const {width} = useWindowSize();

  const thumbnail = width > 768 ?
      images?.find(i=>i.is_main)?.
      thumbnails.find(th=>th.rendition_id===1) :
      images?.find(i=>i.is_main)?.
      thumbnails.find(th=>th.rendition_id===2)

  const translated = translations?.find(t => t.locale === locale);

  const date = moment(translated?.published_at).format("LL")

  return <div
      className="max-w-full w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
    <div className="flex flex-row sm:block hover-img">
      <Link href={`/${locale}/articles/${category.translations.find(t=>t.locale===locale).slug}/${article_id}/${translated?.slug}`}>
        {
          thumbnail && <Image
            src={process.env.NEXT_PUBLIC_API_URL + '/' + thumbnail.path}
            width={thumbnail.width}
            height={thumbnail.height}
            alt={translated?.title}
            className="rounded-lg"
          />
        }
      </Link>
      <div className="py-0 sm:py-3 pl-3 sm:pl-0">
        <h3 className="text-lg font-bold leading-tight mb-2 font-title">
          <Link href={`/${locale}/articles/${category.translations.find(t=>t.locale===locale).slug}/${article_id}/${translated?.slug}`}>{translated?.title}</Link>
        </h3>
        <div className="text-gray-500 text-sm mt-2 font-text">
          {date}{/*, <span className="font-light">views: {visits}</span>*/}
        </div>
      </div>
    </div>
  </div>
}