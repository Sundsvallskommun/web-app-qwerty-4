import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_APP_NAME,
    short_name: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_DESCRPIPTION,
    start_url: process.env?.NEXT_PUBLIC_BASE_PATH ? `${process.env?.NEXT_PUBLIC_BASE_PATH}/` : '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: `${process.env?.NEXT_PUBLIC_BASE_PATH}/icon-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `${process.env?.NEXT_PUBLIC_BASE_PATH}/icon-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
