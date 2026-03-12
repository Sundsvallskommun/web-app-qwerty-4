import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';
import 'dotenv';

export default defineConfig({
  e2e: {
    video: false,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    experimentalRunAllSpecs: true,
    retries: {
      runMode: 3,
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return {
        ...config,
        baseUrl: `http://localhost:${process.env.PORT ?? '3000'}${process.env.NEXT_PUBLIC_BASEPATH || ''}`,
        e2e: {
          env: {
            apiUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
            // IMPORTANT
            // The value below is a test email
            mockEmail: 'mail@example.com',
            // The value below is a test phone number from Post- och telestyrelsen, it is not a real phone number
            mockPhoneNumber: '0701740635',
          },
          baseUrl: `http://localhost:${process.env.PORT ?? '3000'}${process.env.NEXT_PUBLIC_BASEPATH || ''}`,
        },
      };
    },
  },
});
