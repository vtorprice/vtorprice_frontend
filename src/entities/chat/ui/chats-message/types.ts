import { ReactNode } from 'react';

export interface IChatMessage {
  fromMe?: boolean
  children: ReactNode;
  createdAt: Date;
}
