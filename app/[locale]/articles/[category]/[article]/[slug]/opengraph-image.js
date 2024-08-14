
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params: {locale, category, article} }) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/articles/${category}/${article}/api`)
  const data = await response.json();
  const image = data?.images.find(i=>i.is_main)

  const ogImage = image.thumbnails.find(th=>th.rendition_id===3)

  return new ImageResponse(
      (
          // ImageResponse JSX element
          <div
              style={{
                fontSize: 128,
                background: 'white',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
          >
            <img src={process.env.NEXT_PUBLIC_API_URL + ogImage.path}
                 alt={data.translations.find(t => t.locale === locale).title}/>
          </div>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
        ...size
      }
  )
}