import { addEchoMessage } from '@/models/echo';

export const echo = (text: string, message: string) => {
  if (text && message) {
    addEchoMessage(text, message);
  }
};
