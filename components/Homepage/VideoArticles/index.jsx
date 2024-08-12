"use client"
import Image from "next/image";
import {useParams} from "next/navigation";
import {useArticles} from "@/services/articles";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import moment from "moment";

export const VideoArticles = () => {
  const {locale} = useParams()
  const {videos} = useArticles({locale})

  return <div className="py-6 bg-gray-50">
    <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
      <div className="w-full pb-10">
        <h2 className="text-2xl font-bold font-title">
          <span className="bg-red-600 p-3 rounded text-white">DIALOG DESCHIS</span>
        </h2>
      </div>
      <div className="flex flex-wrap md:flex-nowrap mx-auto">
        <div className="flex-shrink max-w-full w-full md:w-3/4 overflow-hidden">
          {videos && videos.slice(0, 1).map(video => (
              <div key={video._id}>
                <div className="hover-img overflow-hidden relative">
                  <Link
                      href={`/${locale}/articles/${video._source.category?.translations.find(t => t.locale === locale).slug}/${video._source.article_id}/${video._source.translations.find(t => t.locale === locale).slug}`}>
                    <Image
                        className="px-5 rounded relative"
                        src={process.env.NEXT_PUBLIC_API_URL + '/' + video._source.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).path}
                        alt={video._source.translations.find(t => t.locale === locale).title}
                        width={video._source.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).width}
                        height={video._source.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).height}
                    />
                    {/*<div className="absolute left-14 bottom-36 text-4xl opacity-85 text-red-600">*/}
                    {/*  <FontAwesomeIcon icon={faYoutube}/>*/}
                    {/*</div>*/}
                    <div className="font-title text-xl mt-5 px-5 font-bold">
                      {video._source.translations.find(t => t.locale === locale).title}
                    </div>
                    <div className="mt-5 px-5 font-text" dangerouslySetInnerHTML={{ __html: video._source.translations.find(t => t.locale === locale).lead }} />
                    <div className="text-gray-500 px-5 text-sm mt-5 font-text">
                      {moment(video._source.translations.find(t => t.locale === locale)?.published_at).format('LL')}, <span
                        className="font-light text-md">views: {video._source.visits}</span>
                    </div>
                  </Link>
                </div>
              </div>
          ))}
        </div>
        <div className="flex-shrink max-w-full w-full md:w-1/4 overflow-y-scroll"
             style={{maxHeight: 'calc(100vh - 10rem)'}}>
          {videos && videos.slice(1).map(video => (
              <div key={video._id}
                   className=" max-w-full w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
                <div className="flex flex-row sm:block hover-img">
                  <Link
                      href={`/${locale}/articles/${video._source.category.translations.find(t => t.locale === locale).slug}/${video._source.article_id}/${video._source.translations.find(t => t.locale === locale).slug}`}
                      className="relative"
                  >
                    {video._source.images.find(i => i.is_main) && (
                        <Image
                            className="rounded-lg"
                            src={process.env.NEXT_PUBLIC_API_URL + '/' + video._source.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).path}
                            alt={video._source.translations.find(t => t.locale === locale).title}
                            width={video._source.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).width}
                            height={video._source.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).height}
                        />
                    )}
                    <div className="absolute left-4 bottom-6 text-4xl text-red-600 opacity-85">
                      <FontAwesomeIcon icon={faYoutube}/>
                    </div>
                  </Link>
                  <div className="py-0 sm:py-3 pl-3 sm:pl-0">
                    <h3 className="text-lg font-bold leading-tight mb-2 font-title">
                      <Link
                          href={`/${locale}/articles/${video._source.category.translations.find(t => t.locale === locale).slug}/${video._source.article_id}/${video._source.translations.find(t => t.locale === locale).slug}`}>
                        {video._source.translations.find(t => t.locale === locale).title}
                      </Link>
                    </h3>
                    <div className="text-gray-500 text-sm mt-7 font-text">
                      1/12/2024, <span className="font-light">views: 1000</span>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  </div>
}