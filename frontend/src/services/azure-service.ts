import { useAssistantStore } from '@sk-web-gui/ai';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { apiService, type ApiResponse } from '@services/api.service';

const TOKEN_TTL_MS = 9 * 60 * 1000;

interface AzureTokenResponse {
  token: string;
  region: string;
}

export interface AzureToken {
  authToken: string;
  region: string;
}

interface CachedAzureToken extends AzureToken {
  expiresAt: number;
}

let cachedToken: CachedAzureToken | undefined;

const getConfiguredApiBaseUrl = () => {
  return useAssistantStore.getState().apiBaseUrl || process.env.NEXT_PUBLIC_API_URL || '';
};

const azureLogin = async (): Promise<AzureTokenResponse> => {
  const response = await apiService.get<ApiResponse<AzureTokenResponse>>('/azure/login');
  return response.data.data;
};

export const getAzureToken = async (baseUrl?: string): Promise<AzureToken> => {
  const now = Date.now();

  if (cachedToken && cachedToken.expiresAt > now) {
    return { authToken: cachedToken.authToken, region: cachedToken.region };
  }

  if (baseUrl && baseUrl !== getConfiguredApiBaseUrl()) {
    throw new Error('Custom Azure API base URLs are not supported by the shared API client.');
  }

  const tokenData = await azureLogin();
  cachedToken = {
    authToken: tokenData.token,
    region: tokenData.region,
    expiresAt: now + TOKEN_TTL_MS,
  };

  return { authToken: tokenData.token, region: tokenData.region };
};

export interface TextToSpeechOptions {
  language?: string;
  voice?: string;
}

export const createSpeechSynthesizer = async (options?: TextToSpeechOptions) => {
  const token = await getAzureToken();
  const language = options?.language || 'sv-SE';
  const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(token.authToken, token.region);
  const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();

  speechConfig.speechSynthesisLanguage = language;
  if (options?.voice) {
    speechConfig.speechSynthesisVoiceName = options.voice;
  }

  return new sdk.SpeechSynthesizer(speechConfig, audioConfig);
};

export const closeSpeechSynthesizer = (speechSynthesizer?: sdk.SpeechSynthesizer | null) => {
  speechSynthesizer?.close();
};

export const textToSpeech = async (text: string, options?: TextToSpeechOptions): Promise<void> => {
  const speechSynthesizer = await createSpeechSynthesizer(options);

  await new Promise<void>((resolve, reject) => {
    speechSynthesizer.speakTextAsync(
      text,
      () => {
        closeSpeechSynthesizer(speechSynthesizer);
        resolve();
      },
      error => {
        closeSpeechSynthesizer(speechSynthesizer);
        reject(error);
      },
    );
  });
};
