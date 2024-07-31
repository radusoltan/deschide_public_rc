"use client"

import {useCategories} from "@/services/categories";
import {useParams} from "next/navigation";
import {HomePageCategory} from "@/components/Homepage/Categories/Category";

export const HomePageGategories = ({

})=> {

  const {locale} = useParams()

  const { categories, isLoading } = useCategories({locale})
  const items = categories?.data.filter((item) => item.id >= 1 && item.id <= 4)
  return <div className="flex-shrink max-w-full w-full lg:w-2/3">
    {items?.map(category=><HomePageCategory key={category.id} category={category} />)}
  </div>
  }