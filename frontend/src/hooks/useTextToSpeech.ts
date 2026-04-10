import { useCallback, useEffect, useRef } from 'react';
import { closeSpeechSynthesizer, createSpeechSynthesizer, type TextToSpeechOptions } from '../services/azure-service';

export const useTextToSpeech = () => {
  const speechSynthesizerRef = useRef<Awaited<ReturnType<typeof createSpeechSynthesizer>> | null>(null);

  const stop = useCallback(() => {
    closeSpeechSynthesizer(speechSynthesizerRef.current);
    speechSynthesizerRef.current = null;
  }, []);

  const speak = useCallback(
    async (text: string, options?: TextToSpeechOptions) => {
      stop();

      const speechSynthesizer = await createSpeechSynthesizer(options);
      speechSynthesizerRef.current = speechSynthesizer;

      await new Promise<void>((resolve, reject) => {
        speechSynthesizer.speakTextAsync(
          text,
          () => {
            if (speechSynthesizerRef.current === speechSynthesizer) {
              speechSynthesizerRef.current = null;
            }
            closeSpeechSynthesizer(speechSynthesizer);
            resolve();
          },
          error => {
            if (speechSynthesizerRef.current === speechSynthesizer) {
              speechSynthesizerRef.current = null;
            }
            closeSpeechSynthesizer(speechSynthesizer);
            reject(error);
          },
        );
      });
    },
    [stop],
  );

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { speak, stop };
};
