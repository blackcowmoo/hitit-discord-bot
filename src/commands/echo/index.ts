import { addEchoMessage, getEchoMessages } from '@/models/echo';

export const echo = async (text: string, message: string) => {
  if (text && message) {
    return await addEchoMessage(text, message);
  }
};

export const echoMessage = async (text: string) => {
  const messages = await getEchoMessages();

  for (const message of messages) {
    if (text.includes(message.text)) return message.message;
  }
};
