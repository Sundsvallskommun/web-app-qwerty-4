import LocalizationProvider from '@components/localization-provider/localization-provider';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import initLocalization from '../i18n';
import { LoginGuard } from '@components/login-guard/login-guard.component';

export interface LocalizationLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const namespaces = ['common', 'paths', 'login', 'assistants', 'crud', 'spaces', 'icons'];

const LocalizationLayout = async (props: LocalizationLayoutProps) => {
  const { params, children } = props;
  const { locale } = await params;
  const { resources } = await initLocalization(locale, namespaces);

  return (
    <LocalizationProvider {...{ locale, resources, namespaces }}>
      <LoginGuard>{children}</LoginGuard>
    </LocalizationProvider>
  );
};

export const generateMetadata = async ({ params }: LocalizationLayoutProps) => {
  const { locale } = await params;
  const { t } = await initLocalization(locale, namespaces);
  const path = (await headers()).get('x-path');

  const pathName =
    !path ? null : (
      path
        .replace(/^\/?/, '') // Remove leading slash
        .split('/') // Split into sections
        .map(
          (s) =>
            `${s.substring(0, 1).toUpperCase()}${s.substring(1)}` // Capitalize the first letter
              .replace('-', ' ') // Replace separators
        )
        .join(', ')
    ); // Comma separate sections

  const getTitle = () => {
    if (path) {
      return `${t('common:app_name')} - ${t(`paths:${path}.title`, { defaultValue: pathName })}`;
    }
    return t('common:app_name');
  };

  const description = t(`paths:${path}.description`, { defaultValue: '' });

  return {
    title: getTitle(),
    description,
  };
};

export default LocalizationLayout;
