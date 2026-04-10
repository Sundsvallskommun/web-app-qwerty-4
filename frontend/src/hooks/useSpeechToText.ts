import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';
import { ResultReason, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAzureToken } from '../services/azure-service';

export interface SpeechToTextError {
  code: 'BROWSER_NOT_SUPPORTED' | 'MIC_NOT_AVAILABLE' | 'SERVICE_ERROR';
  message: string;
}

interface SpeechToTextData {
  finalTranscript: string;
  interimTranscript: string;
  listening: boolean;
  supported: boolean;
  error?: SpeechToTextError;
  start: () => Promise<boolean>;
  stop: () => Promise<void>;
  reset: () => void;
}

type UseSpeechToText = (lang?: string) => SpeechToTextData;

export const useSpeechToText: UseSpeechToText = (lang = 'sv-SE') => {
  const [error, setError] = useState<SpeechToTextError | undefined>(undefined);
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const recognizerRef = useRef<SpeechRecognizer | undefined>(undefined);

  const supported = useMemo(() => {
    return typeof window !== 'undefined' && typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
  }, []);

  const closeRecognizer = useCallback(() => {
    recognizerRef.current?.close();
    recognizerRef.current = undefined;
  }, []);

  const createRecognizer = useCallback(async () => {
    const token = await getAzureToken();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(token.authToken, token.region);
    speechConfig.speechRecognitionLanguage = lang;

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (_sender, event) => {
      if (event.result.reason === ResultReason.RecognizingSpeech) {
        setInterimTranscript(event.result.text);
      }
    };

    recognizer.recognized = (_sender, event) => {
      if (event.result.reason === ResultReason.RecognizedSpeech && event.result.text) {
        setFinalTranscript(current => {
          return [current, event.result.text].filter(Boolean).join(' ').trim();
        });
      }
      setInterimTranscript('');
    };

    recognizer.canceled = (_sender, event) => {
      setInterimTranscript('');
      setListening(false);

      if (event.errorDetails) {
        setError({
          code: 'SERVICE_ERROR',
          message: event.errorDetails,
        });
      }

      closeRecognizer();
    };

    recognizer.sessionStopped = () => {
      setInterimTranscript('');
      setListening(false);
      closeRecognizer();
    };

    return recognizer;
  }, [closeRecognizer, lang]);

  const ensureMicrophoneAccess = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch {
      setError({
        code: 'MIC_NOT_AVAILABLE',
        message: 'Microphone is not available.',
      });
      return false;
    }
  }, []);

  const start = useCallback(async () => {
    if (!supported) {
      setError({
        code: 'BROWSER_NOT_SUPPORTED',
        message: 'Speech-to-text is not supported in this browser.',
      });
      return false;
    }

    if (listening) {
      return true;
    }

    setError(undefined);
    setInterimTranscript('');

    const microphoneReady = await ensureMicrophoneAccess();
    if (!microphoneReady) {
      return false;
    }

    try {
      const recognizer = await createRecognizer();
      recognizerRef.current = recognizer;

      await new Promise<void>((resolve, reject) => {
        recognizer.startContinuousRecognitionAsync(
          () => {
            setListening(true);
            resolve();
          },
          recognizerError => {
            reject(recognizerError);
          },
        );
      });

      return true;
    } catch {
      setError({
        code: 'SERVICE_ERROR',
        message: 'Could not start speech recognition.',
      });
      closeRecognizer();
      return false;
    }
  }, [closeRecognizer, createRecognizer, ensureMicrophoneAccess, listening, supported]);

  const stop = useCallback(async () => {
    const recognizer = recognizerRef.current;

    if (!recognizer) {
      setListening(false);
      return;
    }

    await new Promise<void>(resolve => {
      recognizer.stopContinuousRecognitionAsync(
        () => resolve(),
        () => resolve(),
      );
    });

    setListening(false);
    closeRecognizer();
  }, [closeRecognizer]);

  const reset = useCallback(() => {
    setError(undefined);
    setFinalTranscript('');
    setInterimTranscript('');
  }, []);

  useEffect(() => {
    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.stopContinuousRecognitionAsync(
          () => {
            closeRecognizer();
          },
          () => {
            closeRecognizer();
          },
        );
      } else {
        closeRecognizer();
      }
    };
  }, [closeRecognizer]);

  return {
    finalTranscript,
    interimTranscript,
    listening,
    supported,
    error,
    start,
    stop,
    reset,
  };
};
