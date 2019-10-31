import { addEchoMessage } from '@/models/echo';

export const echo = async (text: string, message: string) => {
  console.log(text, message);
  if (text && message) {
    return await addEchoMessage(text, message);
  }
};
