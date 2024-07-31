import Image from "next/image";
import useWindowSize from "@/utils";

export const ArticleImage = ({image, title}) => {

  const {width} = useWindowSize();
  const renditionId = width < 768 ? 2 : 1;
  const thumbnail = image.thumbnails.find(t=>t.rendition_id === renditionId)

  return <Image
      src={process.env.NEXT_PUBLIC_API_URL+ '/'  + thumbnail.path}
      alt={title}
      width={thumbnail.width}
      height={thumbnail.height}
      className="rounded-lg"
  />
}