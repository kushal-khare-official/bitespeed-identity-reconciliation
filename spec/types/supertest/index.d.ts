import { ContactAttributes } from '@src/models/Contact';
import 'supertest';

declare module 'supertest' {

  export interface Response  {
    headers: Record<string, string[]>;
    body: {
      error: string;
      contact: ContactAttributes;
    };
  }
}