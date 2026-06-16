import { ChatEntryReference } from '@sk-web-gui/ai';

export const INLINE_REFERENCE_LINK_PREFIX = '/__sk-inline-reference__/';

export interface UsedInlineReference {
  number: number;
  reference: ChatEntryReference;
}

interface InlineReferenceToken {
  start: number;
  end: number;
  inlineId: string;
}

const getInlineReferenceTokens = (text: string): InlineReferenceToken[] => {
  const tokens: InlineReferenceToken[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const start = text.indexOf('<inref', cursor);

    if (start === -1) {
      break;
    }

    let index = start + '<inref'.length;

    while (index < text.length && /\s/.test(text[index])) {
      index += 1;
    }

    if (!text.startsWith('id=', index)) {
      cursor = start + 1;
      continue;
    }

    index += 'id='.length;
    const quote = text[index];

    if (quote !== '"' && quote !== "'") {
      cursor = start + 1;
      continue;
    }

    const valueStart = index + 1;
    const valueEnd = text.indexOf(quote, valueStart);

    if (valueEnd === -1) {
      cursor = start + 1;
      continue;
    }

    index = valueEnd + 1;

    while (index < text.length && /\s/.test(text[index])) {
      index += 1;
    }

    if (!text.startsWith('/>', index)) {
      cursor = start + 1;
      continue;
    }

    tokens.push({
      start,
      end: index + 2,
      inlineId: text.slice(valueStart, valueEnd),
    });

    cursor = index + 2;
  }

  return tokens;
};

const replaceInlineReferenceTokens = (text: string, replacer: (inlineId: string) => string) => {
  const tokens = getInlineReferenceTokens(text);

  if (tokens.length === 0) {
    return text;
  }

  let result = '';
  let lastIndex = 0;

  tokens.forEach((token) => {
    result += text.slice(lastIndex, token.start);
    result += replacer(token.inlineId);
    lastIndex = token.end;
  });

  result += text.slice(lastIndex);

  return result;
};

const getReferenceForInlineId = (inlineId: string, references: ChatEntryReference[] = []) => {
  return (
    references.find((reference) => reference.id === inlineId) ??
    references.find((reference) => reference.id.startsWith(inlineId))
  );
};

export const hasRenderableInlineReferences = (text: string, references: ChatEntryReference[] = []) => {
  return getUsedInlineReferences(text, references).length > 0;
};

export const getUsedInlineReferences = (text: string, references: ChatEntryReference[] = []): UsedInlineReference[] => {
  const usedReferences: UsedInlineReference[] = [];
  const referenceNumbers = new Map<string, number>();

  getInlineReferenceTokens(text).forEach(({ inlineId }) => {
    const reference = getReferenceForInlineId(inlineId, references);

    if (!reference || referenceNumbers.has(reference.id)) {
      return;
    }

    const number = usedReferences.length + 1;
    referenceNumbers.set(reference.id, number);
    usedReferences.push({ number, reference });
  });

  return usedReferences;
};

export const prepareTextWithInlineReferences = (
  text: string,
  references: ChatEntryReference[] = [],
  showReferences: boolean = true
) => {
  if (!showReferences) {
    return replaceInlineReferenceTokens(text, () => '');
  }

  const usedReferences = getUsedInlineReferences(text, references);
  const referenceNumbers = new Map(usedReferences.map(({ number, reference }) => [reference.id, number]));

  return replaceInlineReferenceTokens(text, (inlineId) => {
    const reference = getReferenceForInlineId(inlineId, references);

    if (!reference) {
      return '';
    }

    const number = referenceNumbers.get(reference.id);

    return `[${number}](${INLINE_REFERENCE_LINK_PREFIX}${encodeURIComponent(reference.id)})`;
  });
};
