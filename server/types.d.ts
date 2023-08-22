// types.d.ts

import { User } from './src/models/User'; // Adjust the path as needed
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
