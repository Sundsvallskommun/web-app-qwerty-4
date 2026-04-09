import '@styles/tailwind.scss';
import { ReactNode } from 'react';
import AppLayout from '@layouts/app/app-layout.component';
import i18nConfig from './i18nConfig';
import { Viewport } from 'next';

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}

export const generateStaticParams = () => i18nConfig.locales.map((locale) => ({ locale }));

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
};

const RootLayout = async ({ children, params }: RootLayoutProps) => {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
};

export default RootLayout;
