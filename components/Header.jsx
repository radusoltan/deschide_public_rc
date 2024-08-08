"use client"

import {useCategories} from "@/services/categories";
import {useParams, usePathname, useRouter} from "next/navigation";
import {NavSkeleton} from "@/components/Skeletons/NavSkeleton";
import logo from "@/public/deschide_logo.svg"
import Link from "next/link";
import Image from "next/image";
import LanguageChanger from "@/components/LanguageChanger";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faTelegram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {Disclosure} from "@headlessui/react";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {classNames} from "@/utils";

export const Header = ()=>{

  const {locale, category, } = useParams()

  const { categories, isLoading } = useCategories({locale})

  if (isLoading) return <NavSkeleton />

  const navigation = categories?.data.map(({title, slug, in_menu})=>({
    name: title.toUpperCase(),
    href: `/${locale}/articles/${slug}`,
    current: category && category === slug,
    in_menu
  }))

  return <header className="mb-6">
    <div className="mx-auto mb-10 py-2 max-w-7xl hidden sm:block sm:px-3">
      <div className="flex justify-between items-center">
        <div className="flex w-auto">

          <a href="https://www.facebook.com/DeschideStirea/">
            <FontAwesomeIcon className="max-h-5 text-blue-800 px-5 hover:text-red-700" icon={faFacebookF}/>
          </a>

          <a href="https://twitter.com/DeschideMD">
            <FontAwesomeIcon className="max-h-5 text-blue-500 px-5 hover:text-red-700" icon={faTwitter}/>
          </a>

          <a href="https://t.me/deschide_md"><FontAwesomeIcon className="max-h-5 px-5 text-blue-400 hover:text-red-700"
                                                              icon={faTelegram}/></a>

        </div>
        <Link href={`/${locale}`}>
          <div className="flex items-center justify-between w-1/3">

            <Image src={logo} alt="Deschide.MD" className="h-8 w-auto -ml-5 mr-3"/>
            <span className="text-3xl font-bold font-logo">{
              process.env.NEXT_PUBLIC_SITE_NAME
            }</span>
          </div>
        </Link>
        <LanguageChanger/>
      </div>
    </div>
    <Disclosure as="nav" >
      <div className="xl:container mx-auto px-2 md:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon icon={faBars} aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />

            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* visible only on small screen */}
            <div className="flex flex-shrink-0 items-center sm:hidden">
              <Link href={`/${locale}`}>
                <Image src={logo} className="h-8 w-auto" alt={process.env.NEXT_PUBLIC_SITE_NAME}/>
              </Link>
            </div>
            {/* visible on all screen */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-2 flex-wrap">
                {navigation.map((item) => item.in_menu && (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-red-600 hover:text-white',
                      'rounded-md px-3 py-2 text-lg font-bold font-title',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => item.in_menu && (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                  item.current ? 'bg-gray-100 text-gray-600' : 'text-gray-600 hover:bg-red-600 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
        <div>SOME</div>
      </Disclosure.Panel>
    </Disclosure>
  </header>
}