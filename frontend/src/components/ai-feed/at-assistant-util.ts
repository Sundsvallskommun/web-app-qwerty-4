import { ChatEntryReference } from '../../types/history.type';
export const AT_ASSISTANT_LINK_PREFIX = '/__sk-at-assistant__/';

export interface UsedAtAssistant {
  number: number;
  assistant: { handle: string; id: string };
}

interface AtAssistantToken {
  start: number;
  end: number;
  handle: string;
}

const getAtAssistantTokens = (text: string): AtAssistantToken[] => {
  const tokens: AtAssistantToken[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const start = text.indexOf('[[@', cursor);

    if (start === -1) {
      break;
    }

    let index = start + '[['.length;

    while (index < text.length && /\s/.test(text[index])) {
      index += 1;
    }

    if (!text.startsWith('@', index)) {
      cursor = start + 1;
      continue;
    }

    // index += '@'.length;
    // const quote = text[index];

    // if (quote !== '"' && quote !== "'") {
    //   cursor = start + 1;
    //   continue;
    // }

    const valueStart = index + 1;
    const valueEnd = text.indexOf(']]', valueStart);

    if (valueEnd === -1) {
      cursor = start + 1;
      continue;
    }

    index = valueEnd;

    while (index < text.length && /\s/.test(text[index])) {
      index += 1;
    }

    if (!text.startsWith(']]', index)) {
      cursor = start + 1;
      continue;
    }

    tokens.push({
      start,
      end: index + 2,
      handle: text.slice(valueStart, valueEnd),
    });

    cursor = index + 2;
  }

  return tokens;
};

export const getUsedAssistantAts = (text: string): UsedAtAssistant[] => {
  const usedAtAssistant: UsedAtAssistant[] = [];
  const referenceNumbers = new Map<string, number>();

  getAtAssistantTokens(text).forEach(({ handle }) => {
    console.log('handle:', handle);

    const number = usedAtAssistant.length + 1;
  });

  return usedAtAssistant;
};

const replaceAtAssistantsTokens = (text: string, replacer: (handle: string) => string) => {
  const tokens = getAtAssistantTokens(text);

  if (tokens.length === 0) {
    return text;
  }

  let result = '';
  let lastIndex = 0;

  tokens.forEach((token) => {
    result += text.slice(lastIndex, token.start);
    result += replacer(token.handle);
    lastIndex = token.end;
  });

  result += text.slice(lastIndex);

  return result;
};

export const prepareTextWithAssistantAts = (
  text: string,
  references: ChatEntryReference[] = [],
  showReferences: boolean = true
) => {
  if (!showReferences) {
    return replaceAtAssistantsTokens(text, () => '');
  }

  return replaceAtAssistantsTokens(text, (handle) => {
    return `[@${handle}](${AT_ASSISTANT_LINK_PREFIX}${encodeURIComponent(handle)})`;
  });
};
