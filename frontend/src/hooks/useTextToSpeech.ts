import { useCallback, useEffect, useRef, useState } from 'react';
import { synthesizeTextToSpeech, type TextToSpeechOptions } from '../services/azure-service';

export const useTextToSpeech = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    requestIdRef.current += 1;
    cleanupAudio();
    setIsSpeaking(false);
  }, [cleanupAudio]);

  const speak = useCallback(
    async (text: string, options?: TextToSpeechOptions) => {
      stop();

      const requestId = requestIdRef.current;
      const { audioData, contentType } = await synthesizeTextToSpeech(text, options);

      if (requestId !== requestIdRef.current) {
        return;
      }

      const objectUrl = URL.createObjectURL(new Blob([audioData], { type: contentType }));
      const audio = new Audio(objectUrl);

      objectUrlRef.current = objectUrl;
      audioRef.current = audio;
      setIsSpeaking(true);

      await new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          if (requestId === requestIdRef.current) {
            cleanupAudio();
            setIsSpeaking(false);
          }
          resolve();
        };

        audio.onerror = () => {
          if (requestId === requestIdRef.current) {
            cleanupAudio();
            setIsSpeaking(false);
          }
          reject(new Error('Audio playback failed.'));
        };

        void audio.play().catch((error) => {
          if (requestId === requestIdRef.current) {
            cleanupAudio();
            setIsSpeaking(false);
          }
          reject(error instanceof Error ? error : new Error('Audio playback failed.'));
        });
      });
    },
    [cleanupAudio, stop]
  );

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { speak, stop, isSpeaking };
};
