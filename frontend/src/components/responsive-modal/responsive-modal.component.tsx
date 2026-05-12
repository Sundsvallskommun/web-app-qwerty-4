'use client';

import { Modal, cx, useThemeQueries } from '@sk-web-gui/react';
import React, { useContext, useMemo, useState } from 'react';

interface ResponsiveModalProps {
  open: boolean;
  onClose: () => void;
  label?: string | React.JSX.Element;
  closeLabel?: string;
  desktopMaxWidth?: string;
  mobileBottomSheet?: boolean;
  mobileAutoHeight?: boolean;
  hideMobileCloseButton?: boolean;
  enableMobileDragToClose?: boolean;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

const MOBILE_CLOSE_THRESHOLD = 64;
const ResponsiveModalArticleStyleContext = React.createContext<React.CSSProperties | undefined>(undefined);

const ResponsiveModalArticle = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const articleStyle = useContext(ResponsiveModalArticleStyleContext);
  const { style, ...rest } = props;

  return <article ref={ref} {...rest} style={{ ...style, ...articleStyle }} />;
});

ResponsiveModalArticle.displayName = 'ResponsiveModalArticle';

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  open,
  onClose,
  label,
  closeLabel,
  desktopMaxWidth = '36rem',
  mobileBottomSheet = false,
  mobileAutoHeight = false,
  hideMobileCloseButton = false,
  enableMobileDragToClose = false,
  className,
  contentClassName,
  children,
}) => {
  const { isMaxMediumDevice } = useThemeQueries();
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragPointerId, setDragPointerId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const isMobileSheet = mobileBottomSheet && isMaxMediumDevice;

  const panelClassName = cx(
    'w-[calc(100vw-2rem)]',
    isMobileSheet &&
      '!fixed !bottom-0 !left-0 !right-0 !w-screen !max-w-none !rounded-b-none !rounded-t-cards !p-0 !gap-0 !mx-0 !my-0',
    className
  );

  const articleStyle = useMemo<React.CSSProperties>(() => {
    const shouldApplyDragTransform = isMobileSheet && dragOffset > 0;

    return {
      transform: shouldApplyDragTransform ? `translateY(${dragOffset}px)` : undefined,
      transition: shouldApplyDragTransform && dragStartY === null ? 'transform 260ms ease-out' : undefined,
      maxHeight: isMobileSheet && mobileAutoHeight ? 'calc(100dvh - 100px)' : undefined,
      maxWidth: !isMobileSheet ? desktopMaxWidth : undefined,
    };
  }, [desktopMaxWidth, dragOffset, dragStartY, isMobileSheet, mobileAutoHeight]);

  const modalContentTransitionProps =
    isMobileSheet ?
      {
        enter: 'ease-out duration-350',
        enterFrom: 'opacity-0 translate-y-full',
        enterTo: 'opacity-100 translate-y-0',
        leave: 'ease-in duration-100',
        leaveFrom: `opacity-100 translateY(${dragOffset}px)`,
        leaveTo: 'opacity-0 translate-y-full',
      }
    : undefined;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobileSheet || !enableMobileDragToClose) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    setDragPointerId(event.pointerId);
    setDragStartY(event.clientY);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobileSheet || !enableMobileDragToClose || dragStartY === null) return;
    if (dragPointerId !== event.pointerId) return;

    const currentY = event.clientY;
    const delta = currentY - dragStartY;
    if (delta <= 0) {
      setDragOffset(0);
      event.preventDefault();
      return;
    }

    setDragOffset(delta);
    event.preventDefault();
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobileSheet || !enableMobileDragToClose) return;
    if (dragPointerId !== null && dragPointerId !== event.pointerId) return;

    const shouldClose = dragOffset >= MOBILE_CLOSE_THRESHOLD;
    setDragPointerId(null);
    setDragStartY(null);
    setTimeout(() => {
      setDragOffset(0);
    }, 50);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (shouldClose) {
      onClose();
    }
  };

  return (
    <ResponsiveModalArticleStyleContext.Provider value={articleStyle}>
      <Modal
        show={open}
        onClose={onClose}
        as={ResponsiveModalArticle}
        label={label}
        closeLabel={closeLabel}
        hideClosebutton={isMobileSheet && hideMobileCloseButton}
        className={panelClassName}
        style={{ zIndex: 80 }}
        contentTransitionProps={modalContentTransitionProps}
        aria-label={isMobileSheet && typeof label === 'string' ? label : undefined}
        hideLabel={isMobileSheet}
      >
        {isMobileSheet && (
          <div
            className="h-24 w-full shrink-0 flex items-center justify-center touch-none select-none cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            aria-hidden
          >
            <span className="h-4 w-90 rounded-full bg-tertiary-surface" />
          </div>
        )}
        <div
          className={cx(
            'w-full',
            isMobileSheet && mobileAutoHeight && 'overflow-y-auto',
            isMobileSheet && 'px-16 pb-20 pt-4',
            contentClassName
          )}
          style={isMobileSheet && mobileAutoHeight ? { maxHeight: 'calc(100dvh - 124px)' } : undefined}
        >
          {isMobileSheet && typeof label !== 'string' && label}
          {children}
        </div>
      </Modal>
    </ResponsiveModalArticleStyleContext.Provider>
  );
};
