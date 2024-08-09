"use client"
import {useArticle} from "@/services/articles";
import {useCategoryArticles} from "@/services/categories";

import Image from "next/image";
import ads_728 from "@/public/img/ads/ads_728.jpg";
import ads_250 from "@/public/img/ads/250.jpg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faEye, faUser} from "@fortawesome/free-solid-svg-icons";
import {faInstagram, faSquareFacebook, faSquareTwitter, faTelegram} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import {useParams} from "next/navigation";
import {FacebookShareButton} from "react-share";
import gov from "@/public/guvernul.jpg";
import moment from "moment";
import useWindowSize from "@/utils";
import {useTranslation} from "react-i18next";

export const Article = ()=>{
  const { locale, article, category, slug } = useParams()
  const {articleData} = useArticle({article, locale})
  const {data} = useCategoryArticles({locale, category, page: 1, size: 15})
  const { width } = useWindowSize()
  const {t} = useTranslation()


  const mainImage = articleData?.images?.find(i=>i.is_main)

  const thumbnail = width < 768 ?
      mainImage?.thumbnails?.find(t=>t.rendition_id===2) :
      mainImage?.thumbnails?.find(t=>t.rendition_id===1)

  return articleData?.is_video ? <>

    {/* advertisement */}
    <div className="bg-gray-50 py-4">
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="mx-auto table text-center text-sm">
          <a className="uppercase" href="#">Advertisement</a>
          <a href="#">
            <Image src={ads_728} alt="advertisement area"/>
          </a>
        </div>
      </div>
    </div>

    <div className="bg-gray-50 py-6">
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="flex flex-row flex-wrap">
          <div className="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">

            <article>
              <div className="w-full py-3 mb-3">
                <h2 className="text-gray-800 text-3xl font-bold font-title">
                  <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>
                  {articleData?.translations.find(t => t.locale === locale)?.title}
                </h2>
                <div
                    className="relative flex flex-row items-center justify-between overflow-hidden bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20 mt-12 mb-2 px-6 py-2">
                  <div className="my-4 text-sm">

                    <span className="mr-2 md:mr-4 font-text">
                      {
                          articleData?.authors.length > 0 && <><FontAwesomeIcon
                              icon={faUser}/> {articleData?.authors.map((author, index) => <span className="font-semibold"
                                                                                                 key={index}>{author.full_name}, </span>)}</>
                      }


                      </span>

                    <time className="mr-2 md:mr-4 font-text"
                          dateTime={moment(articleData?.translations.find(t => t.locale === locale)?.published_at).format('DD-MM-YYYY')}>
                      <FontAwesomeIcon icon={faCalendarDays}/> {
                      moment(articleData?.translations.find(t => t.locale === locale)?.published_at).format('DD-MM-YYYY')
                    }
                    </time>
                    {/*view*/}
                    <span className="mr-2 md:mr-4 font-text">

                      <FontAwesomeIcon icon={faEye}/> {articleData?.visits} x view
                      </span>

                  </div>

                  <div className=" lg:block">
                    <ul className="space-x-3">

                      <li className="inline-block">
                        <a target="_blank" className="hover:text-red-700 text-2xl" href="#" title="Share to Facebook">
                          <FacebookShareButton className="hover:text-red-700 text-2xl"
                                               url={process.env.NEXT_PUBLIC_API_URL + `/${locale}/articles/${category}/${article}/${slug}`}>
                            <FontAwesomeIcon icon={faSquareFacebook}/>
                          </FacebookShareButton>

                        </a>
                      </li>

                      <li className="inline-block">
                        <a target="_blank" className="hover:text-red-700 text-2xl" href="#" title="Share to Twitter">

                          <FontAwesomeIcon icon={faSquareTwitter}/>
                        </a>
                      </li>

                      <li className="inline-block">
                        <a target="_blank" className="hover:text-red-700 text-2xl" href="#"
                           title="Share to Instagram">
                          {/* <i class="fab fa-instagram fa-2x"></i> */}

                          <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                      </li>

                      <li className="inline-block">
                        <a target="_blank" className="hover:text-red-700 text-2xl" href="#"
                           title="Share to Instagram">
                          {/* <i class="fab fa-instagram fa-2x"></i> */}

                          <FontAwesomeIcon icon={faTelegram}/>
                        </a>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-wrap -mx-3">
                <div className="max-w-full w-full px-4">
                  <div className="leading-relaxed pb-4 font-text">
                    <p className="mb-5"
                       dangerouslySetInnerHTML={{__html: articleData?.translations.find(t => t.locale === locale)?.lead}}/>
                    <>
                      {
                          articleData?.translations.find(t => t.locale === locale)?.embed &&
                          <div className="aspect-w-16 aspect-h-9" dangerouslySetInnerHTML={{
                            __html: articleData?.translations.find(t => t.locale === locale)?.embed
                          }}/>
                      }


                    </>
                  </div>
                </div>
              </div>
            </article>
            <div className="flex justify-center items-center py-6">
              <a href="http://drrm.gov.ro/w/">
                <Image
                    src={gov}
                    width={1100}
                    height={130}
                    alt="Guvern"
                />
              </a>

            </div>
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                 role="alert">
              Acest articol este proprietatea Deschide.md și este protejat de legea drepturilor de autor. Orice preluare a conținutului se poate face DOAR cu citarea sursei și cu LINK ACTIV către pagina acestui articol.
            </div>

          </div>
          <div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-last lg:order-last">
            <div className="text-sm py-6 sticky">
              <div className="w-full text-center">
                <a className="uppercase" href="#">Advertisement</a>
                <a href="#">
                  <Image className="mx-auto" src={ads_250} alt="advertisement area"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </> : <>

    {/* advertisement */}
    <div className="bg-gray-50 py-4">
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="mx-auto table text-center text-sm">
          <a className="uppercase" href="#">Advertisement</a>
          <a href="#">
            <Image src={ads_728} alt="advertisement area"/>
          </a>
        </div>
      </div>
    </div>

    {/* block news */}
    <div className="bg-gray-50 py-6">
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="flex flex-row flex-wrap">

          {/* Left */}
          <div className="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">
            <article>
              <div className="w-full py-3 mb-3">
                <h2 className="text-gray-800 text-3xl font-bold font-title">
                  <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>
                  {articleData?.translations.find(t => t.locale === locale)?.title}
                </h2>
                <div
                    className="relative flex flex-row items-center justify-between overflow-hidden bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20 mt-12 mb-2 px-6 py-2">
                  <div className="my-4 text-sm">

                    <span className="mr-2 md:mr-4 font-text">
                      {
                        articleData?.authors.length > 0 && <>
                          <FontAwesomeIcon icon={faUser}/>
                          {articleData?.authors.map((author, index) => <span className="font-semibold" key={index}>{author.full_name}, </span>)}
                        </>
                      }
                      </span>

                    <time className="mr-2 md:mr-4 font-text" dateTime={moment(articleData?.translations.find(t => t.locale === locale)?.published_at).format('DD-MM-YYYY')}>
                      <FontAwesomeIcon icon={faCalendarDays}/> {
                      moment(articleData?.translations.find(t => t.locale === locale)?.published_at).format('DD-MM-YYYY')
                    }
                    </time>
                    {/*view*/}
                    <span className="mr-2 md:mr-4 font-text">

                      <FontAwesomeIcon icon={faEye}/> {articleData?.visits} x view
                      </span>

                  </div>

                  <div className=" lg:block">
                    <ul className="space-x-3">

                      <li className="inline-block">
                        <a target="_blank" className="hover:text-red-700 text-2xl" href="#" title="Share to Facebook">
                          <FacebookShareButton className="hover:text-red-700 text-2xl"  url={process.env.NEXT_PUBLIC_API_URL + `/${locale}/articles/${category}/${article}/${slug}`}>
                            <FontAwesomeIcon icon={faSquareFacebook}/>
                          </FacebookShareButton>

                        </a>
                      </li>

                      <li className="inline-block">
                        <a target="_blank" className="hover:text-red-700 text-2xl" href="#" title="Share to Twitter">

                          <FontAwesomeIcon icon={faSquareTwitter}/>
                        </a>
                      </li>

                      <li className="inline-block">
                        <a target="_blank" className="hover:text-red-700 text-2xl" href="#"
                           title="Share to Instagram">
                          {/* <i class="fab fa-instagram fa-2x"></i> */}

                          <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                      </li>

                      <li className="inline-block">
                        <a target="_blank" className="hover:text-red-700 text-2xl" href="#"
                           title="Share to Instagram">
                          {/* <i class="fab fa-instagram fa-2x"></i> */}

                          <FontAwesomeIcon icon={faTelegram}/>
                        </a>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-row flex-wrap -mx-3">
                <div className="max-w-full w-full px-4">
                  {/* Article Content */}
                  <div className="leading-relaxed pb-4 font-text">
                    <p className="mb-5"
                       dangerouslySetInnerHTML={{__html: articleData?.translations.find(t => t.locale === locale)?.lead}}/>
                    <figure className="text-center mb-6">
                      {
                          thumbnail && <>
                            <Image
                                src={process.env.NEXT_PUBLIC_API_URL + '/' + thumbnail?.path}
                                width={thumbnail?.width}
                                height={thumbnail?.height}
                                alt={articleData?.translations.find(t => t.locale === locale)?.title}
                                className="h-auto w-full"
                            />
                            <figcaption>{mainImage?.description} | FOTO: <i>{mainImage.author}</i></figcaption>
                          </>
                      }


                    </figure>
                    <div className="mb-5 article-body"
                         dangerouslySetInnerHTML={{__html: articleData?.translations.find(t => t.locale === locale)?.body}}/>
                  </div>

                </div>

              </div>
            </article>
            <div className="flex justify-center items-center py-6">
              <a href="http://drrm.gov.ro/w/">
                <Image
                    src={gov}
                    width={1100}
                    height={130}
                    alt="Guvern"
                />
              </a>

            </div>
          </div>
          {/* Right */}
          <div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-last lg:order-last">
            <div className="w-full bg-white border px-5 pt-5 rounded-lg">
              <div className="mb-6">
                <div className="w-full py-3">
                  <h2 className="text-gray-800 text-lg font-bold font-category">
                    <span className="inline-block h-4 border-l-4 border-red-600 mr-2"></span>
                    {t('popular')}
                  </h2></div>
                <ul className="post-number">
                  {data?.popularArticles && data.popularArticles.map((article, index) => <li
                      key={index}
                      className="flex-row border-b border-gray-100 hover:bg-gray-50 font-title"
                  >
                    <Link
                        href={`/${locale}/articles/${article.category.translations.find(t => t.locale === locale).slug}/${article.article_id}/${article.translations?.find(t => t.locale === locale)?.slug}`}
                        className="text-lg font-bold px-6 py-3 flex flex-row items-center"
                    >{
                      article?.translations.find(t => t.locale === locale)?.title
                    }</Link>
                    <div className="text-gray-500 text-sm lg:ml-16 ml-20 font-text">
                      {
                        moment(article?.translations.find(t => t.locale === locale)?.published_at).format("MM Do YYYY, h:mm")
                      }, <span className="font-light">views: {article?.visits}</span>
                    </div>
                  </li>)}
                </ul>
              </div>

            </div>
            <div className="text-sm py-6 sticky">
              <div className="w-full text-center">
                <a className="uppercase" href="#">Advertisement</a>
                <a href="#">
                  <Image className="mx-auto" src={ads_250} alt="advertisement area"/>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
}