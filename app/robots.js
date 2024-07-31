export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: process.env.NEXT_PUBLIC_APP_URL + '/sitemap.xml',
  }
}