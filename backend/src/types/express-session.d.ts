import { User } from '@/interfaces/users.interface';
interface Engagement {
  organizationName: string;
  organizationNumber: string;
  organizationId: string;
}

interface AuthFlow {
  state?: string;
  successRedirect?: string;
  failureRedirect?: string;
}

declare module 'express-session' {
  interface Session {
    returnTo?: string;
    user?: User;
    representing?: Engagement;
    passport?: any;
    representingChoices?: Engagement[];
    messages: string[];
    authToken?: string;
    authState?: AuthFlow['state'];
    authSuccessRedirect?: AuthFlow['successRedirect'];
    authFailureRedirect?: AuthFlow['failureRedirect'];
  }
}
