declare module 'session-file-store' {
  import type session from 'express-session';

  type FileStoreFactory = new (options?: Record<string, unknown>) => session.Store;

  export default function createFileStore(sessionModule: typeof import('express-session')): FileStoreFactory;
}
