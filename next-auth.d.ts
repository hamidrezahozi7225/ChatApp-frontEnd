import 'next-auth';
import { ISODateString } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    email: string;
    status: string;
    id: string;
  }
}
