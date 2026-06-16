import { Link } from '@sk-web-gui/link';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import Markdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatEntryReference } from '@sk-web-gui/ai';
import { INLINE_REFERENCE_LINK_PREFIX, prepareTextWithInlineReferences } from './inline-reference-utils';
import { AT_ASSISTANT_LINK_PREFIX, prepareTextWithAssistantAts } from './at-assistant-util';
import { SpacePublic } from '@data-contracts/backend/data-contracts';
import NextLink from 'next/link';

interface MarkdownRenderedProps extends Options, Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  text: string;
  messageId: string;
  hideElements: boolean;
  references?: ChatEntryReference[];
  space?: SpacePublic;
  showReferences?: boolean;
  /**
   * If links should be tabbable
   * @default true
   */
  tabbable?: boolean;
}

const ParagraphComponent = (props: React.ComponentPropsWithoutRef<'p'>) => {
  return <p className="sk-ai-markdown-p">{props.children}</p>;
};

interface AtAssistantButtonProps {
  hidden: boolean;
  href: string;
  space?: SpacePublic;
}

const AtAssistantButton: React.FC<AtAssistantButtonProps> = ({ hidden, href, space }) => {
  const handle = decodeURIComponent(href.replace(AT_ASSISTANT_LINK_PREFIX, ''));
  const assistantId = space?.applications?.assistants.items.find((assistant) => assistant.name === handle)?.id;

  if (!space || !assistantId) {
    return <span className="py-4 px-8 bg-tertiary-surface rounded-full font-bold text-small">@{handle}</span>;
  }

  return (
    <span className="relative">
      <PopupMenu type="dialog" position="under" align="start" autoAlign autoPosition>
        <PopupMenu.Button
          type="button"
          size="sm"
          variant="tertiary"
          rounded
          className="py-4 px-8 min-h-0 h-auto border-0 rounded-full font-bold text-small"
          aria-hidden={hidden ? 'true' : 'false'}
        >
          @{handle}
        </PopupMenu.Button>
        <PopupMenu.Panel className="sk-ai-markdown-inline-reference-popup p-6">
          <PopupMenu.Items>
            <PopupMenu.Item>
              <NextLink href={`/assistant/${assistantId}`} className="text-small !py-2 !px-4 !min-h-0 !h-28">
                Gå till {handle}
              </NextLink>
            </PopupMenu.Item>
          </PopupMenu.Items>
        </PopupMenu.Panel>
      </PopupMenu>
    </span>
  );
};

interface InlineReferenceButtonProps {
  hidden: boolean;
  href: string;
  references: ChatEntryReference[];
  tabbable: boolean;
  children: React.ReactNode;
}

const InlineReferenceButton: React.FC<InlineReferenceButtonProps> = ({
  hidden,
  href,
  references,
  tabbable,
  children,
}) => {
  const referenceId = decodeURIComponent(href.replace(INLINE_REFERENCE_LINK_PREFIX, ''));
  const reference = references.find((item) => item.id === referenceId);
  const number = React.Children.toArray(children).join('');

  if (!reference) {
    return null;
  }

  return (
    <span className="sk-ai-markdown-inline-reference">
      <PopupMenu type="dialog" position="under" align="end" autoAlign autoPosition>
        <PopupMenu.Button
          type="button"
          size="sm"
          variant="tertiary"
          rounded
          className="sk-ai-markdown-inline-reference-button"
          aria-hidden={hidden ? 'true' : 'false'}
          aria-label={`Källa ${number}: ${reference.title}`}
          tabIndex={hidden || !tabbable ? -1 : 0}
        >
          {number}
        </PopupMenu.Button>
        <PopupMenu.Panel className="sk-ai-markdown-inline-reference-popup">
          <small>
            {reference.url ?
              <Link external href={reference.url}>
                {reference.title}
              </Link>
            : reference.title}
          </small>
        </PopupMenu.Panel>
      </PopupMenu>
    </span>
  );
};

interface LinkComponentProps {
  hidden: boolean;
  id: string;
  references: ChatEntryReference[];
  tabbable: boolean;
  space?: SpacePublic;
}

const LinkComponent =
  ({ hidden, id, references, tabbable, space }: LinkComponentProps) =>
  (props: React.ComponentPropsWithoutRef<'a'>) => {
    const { href, children } = props;

    if (href?.startsWith(AT_ASSISTANT_LINK_PREFIX)) {
      return <AtAssistantButton hidden={hidden} href={href} space={space} />;
    }
    if (href?.startsWith(INLINE_REFERENCE_LINK_PREFIX)) {
      return (
        <InlineReferenceButton hidden={hidden} href={href} references={references} tabbable={tabbable}>
          {children}
        </InlineReferenceButton>
      );
    }

    return (
      <Link
        key={id}
        aria-hidden={hidden ? 'true' : 'false'}
        external={href && href.startsWith('http')}
        href={href}
        className="sk-ai-markdown-a"
        tabIndex={hidden || !tabbable ? -1 : 0}
      >
        {children || href}
      </Link>
    );
  };

const OlComponent = (props: React.ComponentPropsWithoutRef<'ol'>) => {
  return <ol className="sk-ai-markdown-ol">{props.children}</ol>;
};

const UlComponent = (props: React.ComponentPropsWithoutRef<'ul'>) => {
  return <ul className="sk-ai-markdown-ul">{props.children}</ul>;
};

const LiComponent = (props: React.ComponentPropsWithoutRef<'li'>) => {
  return <li className="sk-ai-markdown-li">{props.children}</li>;
};

const CodeComponent = (props: React.ComponentPropsWithoutRef<'code'>) => {
  return <code className="sk-ai-markdown-code">{props.children}</code>;
};

const PreComponent = (props: React.ComponentPropsWithoutRef<'pre'>) => {
  return <pre className="sk-ai-markdown-pre">{props.children}</pre>;
};

export const MarkdownRendered: React.FC<MarkdownRenderedProps> = (props) => {
  const {
    text,
    components,
    className,
    messageId,
    hideElements,
    references = [],
    showReferences = true,
    tabbable = true,
    space,
    ...rest
  } = props;
  const preparedText = prepareTextWithInlineReferences(prepareTextWithAssistantAts(text), references, showReferences);

  return (
    <div className={cx('sk-ai-markdown', className)}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        disallowedElements={['script', 'iframe']}
        components={{
          p: ParagraphComponent,
          a: LinkComponent({ hidden: hideElements, id: messageId, references, tabbable, space }),
          ol: OlComponent,
          ul: UlComponent,
          li: LiComponent,
          code: CodeComponent,
          pre: PreComponent,
          ...components,
        }}
        {...rest}
      >
        {preparedText}
      </Markdown>
    </div>
  );
};
