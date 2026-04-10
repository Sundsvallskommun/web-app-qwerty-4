import { AZURE_REGION, AZURE_SUBSCRIPTION_KEY } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@/utils/logger';
import axios, { AxiosError } from 'axios';

export const getToken = async (): Promise<string> => {
  if (!AZURE_REGION || !AZURE_SUBSCRIPTION_KEY) {
    logger.error('Missing Azure credentials');
    throw new HttpException(500, 'Azure Speech service is not configured');
  }

  try {
    const url = `https://${AZURE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': AZURE_SUBSCRIPTION_KEY,
    };

    const response = await axios.post<string>(url, undefined, { headers });

    if (!response.data) {
      logger.error('Azure token response was empty');
      throw new HttpException(502, 'Could not fetch Azure Speech token');
    } else {
      logger.info('Azure token received');
      return response.data;
    }
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }

    logger.error('Error getting Azure token', error);

    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const details =
      axios.isAxiosError(error) ? error.response?.data ?? error.message : error instanceof Error ? error.message : undefined;

    logger.error(`Azure Speech STS request failed with status ${status ?? 'unknown'}: ${JSON.stringify(details)}`);
    throw new HttpException(502, 'Could not fetch Azure Speech token');
  }
};
