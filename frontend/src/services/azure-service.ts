import { apiService, type ApiResponse } from '@services/api.service';
import { useAssistantStore } from '@sk-web-gui/ai';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const TOKEN_TTL_MS = 9 * 60 * 1000;

interface AzureTokenResponse {
  token: string;
  region: string;
}

export interface AzureToken {
  authToken: string;
  region: string;
}

export interface TextToSpeechOptions {
  language?: string;
  voice?: string;
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

export const createSpeechSynthesizer = async (options?: TextToSpeechOptions) => {
  const token = await getAzureToken();
  const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(token.authToken, token.region);
  if (options?.language) {
    speechConfig.speechSynthesisLanguage = options.language;
  }
  speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;

  if (options?.voice) {
    speechConfig.speechSynthesisVoiceName = options.voice;
  }

  return new sdk.SpeechSynthesizer(speechConfig, null);
};

export const closeSpeechSynthesizer = (speechSynthesizer?: sdk.SpeechSynthesizer | null) => {
  speechSynthesizer?.close();
};

export const synthesizeTextToSpeech = async (
  text: string,
  options?: TextToSpeechOptions
): Promise<{ audioData: ArrayBuffer; contentType: string }> => {
  const speechSynthesizer = await createSpeechSynthesizer(options);

  return new Promise((resolve, reject) => {
    speechSynthesizer.speakTextAsync(
      text,
      (result) => {
        closeSpeechSynthesizer(speechSynthesizer);

        if (result.audioData?.byteLength) {
          resolve({
            audioData: result.audioData,
            contentType: 'audio/mpeg',
          });
          return;
        }

        reject(new Error(result.errorDetails || 'Azure text-to-speech returned no audio data.'));
      },
      (error) => {
        closeSpeechSynthesizer(speechSynthesizer);
        reject(new Error(error));
      }
    );
  });
};

export const textToSpeech = async (text: string, options?: TextToSpeechOptions): Promise<void> => {
  const { audioData, contentType } = await synthesizeTextToSpeech(text, options);
  const blob = new Blob([audioData], { type: contentType });
  const objectUrl = URL.createObjectURL(blob);
  const audio = new Audio(objectUrl);

  try {
    await audio.play();
  } finally {
    audio.onended = () => {
      URL.revokeObjectURL(objectUrl);
    };
    audio.onerror = () => {
      URL.revokeObjectURL(objectUrl);
    };
  }
};
