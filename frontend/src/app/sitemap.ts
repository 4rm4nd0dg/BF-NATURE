import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bangrweoogo.bf';

  const routes = [
    '',
    '/billetterie',
    '/faune-flore',
    '/location-espaces',
    '/histoire',
    '/sensibilisation',
    '/mediatheque',
    '/personnel',
    '/confidentialite',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
