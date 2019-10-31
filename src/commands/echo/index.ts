import { addEchoMessage, getEchoMessages, deleteEchoMessage } from '@/models/echo';

export const echo = async (text: string, message: string) => {
  if (text && message) {
    return await addEchoMessage(text, message);
  }
};

export const removeMessage = async (text: string) => {
  if (text) {
    await deleteEchoMessage(text);
  }
};

export const echoMessage = async (text: string) => {
  const messages = await getEchoMessages();

  for (const message of messages) {
    if (text.includes(message.text)) return message.message;
  }
};
