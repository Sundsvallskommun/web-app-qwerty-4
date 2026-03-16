import { DesktopMenu } from '@components/desktop-menu/desktop-menu.component';
import { MobileMenu } from '@components/mobile-menu/mobile-menu.component';
import { ReactNode } from 'react';

export interface LocalizationLayoutProps {
  children: ReactNode;
}

const AssistantLayout = async ({ children }: LocalizationLayoutProps) => {
  return (
    <>
      <MobileMenu />
      <div className="flex gap-0">
        <DesktopMenu />
        {children}
      </div>
    </>
  );
};

export default AssistantLayout;
